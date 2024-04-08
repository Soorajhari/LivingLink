import { Request, Response } from "express";
import { userModel } from "../../models/users";

const getUserdata = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;
    // console.log(id)

    let userDetails = await userModel.findById({ _id: id });
    // console.log(userDetails)
    res.json({ status: "ok", user: userDetails });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: "error occurred" });
  }
};

const uploadData = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, id } = req.body;
    const profilePicPath = req?.file?.path;

    // console.log(firstName, lastName,id)
    // console.log(req.file?.path)

    let user = await userModel.findOne({ _id: id });
    // console.log(user,"is there is the error")
    // console.log(req.params.id)
    if (user) {
      const update = await userModel.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            firstName,
            lastName,
            profileImage: profilePicPath,
          },
        },
        { new: true }
      );

      console.log(update, "user updated");
      res.json({ status: "ok", message: "user updated" });
    } else {
      console.log("user already regsiterd");
      res.json({ status: "error", message: "user already registerd" });
    }
  } catch (err) {
    console.log("update catch errror");
    res.json({ status: "error", error: "update error" });
  }
};

const getAllusers = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;
    // console.log(id)

    let userDetails = await userModel.find();
    // console.log(userDetails)
    res.json({ status: "ok", user: userDetails });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: "error occurred" });
  }
};

const Followers = async (req: Request, res: Response) => {
  try {
    const { userid, profileId } = req.body;
    // console.log(userid,profileId)
    const user = await userModel.findByIdAndUpdate(
      { _id: userid },
      {
        $addToSet: { followers: profileId },
      },
      { new: true }
    );

    const userProfile = await userModel.findByIdAndUpdate(
      { _id: profileId },
      {
        $addToSet: { following: userid },
      },
      { new: true }
    );
    res.json({ status: "ok", message: "followers updated", user });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: "error occurred" });
  }
};

const FollowersData = async (req: Request, res: Response) => {
  try {
    const id = req.query.q as string;
    console.log(id);
    const user = await userModel.findById({ _id: id });
    console.log(user);

    res.json({ status: "ok", message: "followers updated", user });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: "error occurred" });
  }
};

const Unfollowers = async (req: Request, res: Response) => {
  try {
    const { userId, profileId } = req.body;
    console.log(userId, profileId);
    const user = await userModel.findById({ _id: userId });
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "Post not found" });
    }
    const userIndex = user.followers.indexOf(profileId);
    console.log(userIndex)
    if (userIndex>=0) {
      user.followers.splice(profileId, 1);
    }

    await user.save();

    const userProfile = await userModel.findById({ _id: profileId });
    if (!userProfile) {
      return res
        .status(404)
        .json({ status: "error", message: "Post not found" });
    }
    const profileIndex = userProfile.following.indexOf(userId);
    if (profileIndex>=0) {
      userProfile.following.splice(userId, 1);
    }

    await userProfile.save();
    res.json({ status: "ok", message: "followers updated", user });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: "error occurred" });
  }
};

export = {
  getUserdata,
  uploadData,
  getAllusers,
  Followers,
  Unfollowers,
  FollowersData,
};
