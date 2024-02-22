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
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });

const createPost= async (req:Request,res:Response):Promise<void>=>{
    try{
        const textData = req.body.text;
        console.log('Text data:', textData);
        // console.log(req.body.img)
        console.log(req.body.file)
        const cloudinaryResponse = await cloudinary.uploader.upload(req.body.file , { resource_type: 'auto' });
        console.log('Cloudinary response:', cloudinaryResponse);
    }catch(error){
        console.log(error.message)
    }

}

export ={
    createPost
}