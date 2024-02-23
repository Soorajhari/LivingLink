
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from 'cloudinary'
import { postModel } from "../../models/post";
import { userModel } from "../../models/users";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });

const createPost= async (req:Request,res:Response):Promise<void>=>{
    try{
        const textData = req.body.text;
        const id=req.body.id
        console.log(id)
        console.log(req.body.file)
        const user= await userModel.findOne({_id:id})
        console.log(user)
        const cloudinaryResponse = await cloudinary.uploader.upload(req.body.file , { resource_type: 'auto' });
        console.log(cloudinaryResponse)
        const url=cloudinaryResponse.url
        console.log(url) 

        const post=new postModel({
            user:id,
            text:textData,
            Url:url
        })

        post.save()
        res.json({status:"ok",message:"post added successfully"})

    }catch(error){
        console.log(error.message)
        res.json({status:"error",message:"An error occured"})
    }

}


const getPostData=async(req:Request,res:Response)=>{
    try{
        const postData=await postModel.find().populate('user')
        console.log(postData)
        // const userData=await userModel.findById({_id:postData.user})
        if(postData){
            res.json({status:"ok",Data:postData})
        }
    }catch(error){
        console.log(error.message)
        res.json({status:"error",message:"An error occured"})
    }

}












export ={
    createPost,getPostData
}