import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../../models/users";
import { otpModel } from "../../models/otp";
import { Request, Response } from "express";
import { promises } from "dns";
import { error } from "console";
import * as nodemailer from "nodemailer";
import { RequiredPathKeys } from "mongoose/types/inferschematype";
import { request } from "http";
import { UserRequest, otpRequest, userData } from "../../interfaces/user";
import dotenv from "dotenv";
dotenv.config();

const Asecret = process.env.SECRET_TOKEN || "";
const Rsecret = process.env.SECRET_RTOKEN || "";
console.log(Asecret);
console.log(Rsecret);

const creatUser = async (
  req: Request<UserRequest>,
  res: Response
): Promise<any> => {
  const { firstName, lastName, email, mobile, password, role, subrole } =
    req.body;
  console.log(req.body);
  const salt = 10;
  console.log(salt);

  const hashPassword = bcrypt.hashSync(password, salt);
  // console.log(hashPassword);

  try {
    const user_email = await userModel.findOne({ email: email });
    if (user_email) {
      return res.json({
        status: "error",
        message: "This email is already registered.",
      });
    }

    const user = new userModel({
      firstName,
      lastName,
      email,
      mobile,
      password: hashPassword,
      role,
      subrole,
    });

    await user.save();
    res.json({
      status: "ok",
      _id: user._id,
      message: "User Signup Successfully!",
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
      subrole: user.subrole,
    });
    await sendOtp(email);
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "Duplicae email or Network error" });
  }
};

const sendOtp = async (email: string) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "soorajhari1999@gmail.com",
      pass: "tnbf dqhr uewp raxu",
    },
  });
  const mailOptions = {
    from: "soorajhari1999@gmail.com",
    to: email,
    subject: "Hello",
    text: "you otp here !",
    html: `${otp}`,
  };
  const newOTP = new otpModel({
    otp,
    email,
  });
  await newOTP.save();

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const resendOtp = async (req: Request, res: Response) => {
  let otp = Math.floor(100000 + Math.random() * 900000);
  const email: string = req.body.email;
  console.log(email);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "soorajhari1999@gmail.com",
      pass: "tnbf dqhr uewp raxu",
    },
  });
  const mailOptions = {
    from: "soorajhari1999@gmail.com",
    to: email,
    subject: "Hello",
    text: "you otp here !",
    html: `${otp}`,
  };
  const newOTP = new otpModel({
    otp,
    email,
  });
  await newOTP.save();

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.json({ status: "ok", message: "otp send successfully" });
    }
  });
};

const verifyOtp = async (
  req: Request<otpRequest>,
  res: Response
): Promise<void> => {
  try {
    const otp = req.body.Otp;
    console.log(otp);
    const newotp: string = otp.join("");
    console.log(typeof newotp);

    const savedOtp = await otpModel.findOne({ otp: newotp });

    console.log(typeof savedOtp?.otp);
    if (!savedOtp) {
      res.json({
        status: "Invalid otp",
        message: " otp is invalid, please try again",
      });
      console.log("not");
      return;
    } else if (savedOtp.otp === newotp) {
      console.log("sucess");
      res.json({ status: "ok", message: "Otp verified succesfully" });
    } else {
      res.json({ status: "Invalid otp", message: "otp is invalid try again" });
      console.log("error");
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: "error",
      message: "An error occured please try again later",
    });
  }
};

const userLogin = async (
  req: Request<userData>,
  res: Response
): Promise<any> => {
  const { email, password, id } = req.body;

  console.log(email, password, id);
  const user = await userModel.findOne({ email: email });
  console.log(user);

  if (!user) {
    res.json({ status: 404, message: "user not found" });
    return;
  } else if (id) {
    const user_id = id;
    const access_token = jwt.sign(
      { _id: user._id, google_id: id, email: user.email },
      Asecret,
      {
        expiresIn: "20s",
      }
    );
    const refresh_token = jwt.sign(
      { _id: user._id, google_id: id, email: user.email },
      Rsecret,
      { expiresIn: "7d" }
    );

    console.log(access_token);
    console.log(refresh_token);

    res.status(200).json({
      status: "ok",
      _id: user._id,
      accesstoken: access_token,
      refreshtoken: refresh_token,
      role: user.role,
      subrole: user.subrole,
      firstName: user.firstName,
      email: user.email,
      message: "login successfully",
    });
  } else {
    try {
      const passowrdMatch = await bcrypt.compare(password, user.password);

      if (!passowrdMatch) {
        res.json({ status: 404, message: "wrong password or inavlid email" });
        return;
      }
      const payload = { _id: user._id, email: user.email };
      const access_token = jwt.sign(payload, Asecret, {
        expiresIn: "20s",
      });
      console.log(access_token + "hi sree");
      const refresh_token = jwt.sign(payload, Rsecret, { expiresIn: "7d" });

      console.log(refresh_token + "hi sooraj");
      // res.cookie('access_token',access_token,{httpOnly:true})

      // res.cookie("refresh_token", refresh_token, {
      //   httpOnly: false,
      //   sameSite: "none",
      //   secure: true,
      //   domain:'localhost',
      //   path:"/",
      //   maxAge:7*24*60*1000
      // });

      res.status(200).json({
        status: "ok",
        _id: user._id,
        accesstoken: access_token,
        refreshtoken: refresh_token,
        role: user.role,
        subrole: user.subrole,
        firstName: user.firstName,
        email: user.email,
        message: "login successfully",
      });
    } catch (error: any) {
      console.log(error);
      res.status(404).json({
        status: "error",
        message: "An error occured please try again",
      });
    }
  }
};

const userData = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const userDetails = await userModel.findOne({ _id: id });
    console.log(userDetails);
    res.status(200).json({
      status: "ok",
      _id: userDetails?._id,
      firstName: userDetails?.firstName,
      role: userDetails?.role,
      email: userDetails?.email,
    });
  } catch (error) {
    console.error(error.message);
  }
};

const generateAcessToken = (req: Request, res: Response) => {
  try {
    const refreshtoken = req.body.refreshtoken;
    console.log(refreshtoken+"hi sooraj")
    if (!refreshtoken) {
      return res.status(400).json({ msg: "Please login again." });
    }

    jwt.verify(
      refreshtoken,
      Rsecret,
      async (err: any, result: any) => {
        if (err) {
          res.status(400).json({ msg: "Please login again." });
        }
        const user = await userModel.findById(result._id);

        if (!user) {
          res.status(400).json({ msg: "User does not exist." });
        }
        const access_token = jwt.sign(
          { _id: user?._id, emai: user?.email },
          Asecret,
          {
            expiresIn: "20s",
          }
        );
        res.json({status:"refreshtoken send successfully" ,access_token, user });
      }
    );
  } catch (error: any) {
    console.log(error);
    res
      .status(404)
      .json({ status: "error", message: "An error occured please try again" });
  }
};

export = {
  creatUser,
  verifyOtp,
  userLogin,
  resendOtp,
  userData,
  generateAcessToken,
  // logout
};
