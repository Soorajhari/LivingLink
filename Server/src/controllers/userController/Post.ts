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


const createPost= async (req:Request,res:Response):Promise<void>=>{
    try{
  const postdata=req.body.text
  console.log(postdata)
    }catch(error){
        console.log(error.message)
    }

}

export ={
    createPost
}