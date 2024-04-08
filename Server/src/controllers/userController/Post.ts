
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
        // console.log(cloudinaryResponse)
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
      const postData = await postModel.find().populate('user').sort({ createdAt: -1 });
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

const Search = async (req: Request, res: Response) => {
  try {
    const search = req.query.q as string;

    let searchData: any[] = [];

    if (search && search.trim().length > 0) {
      const searchPattern = new RegExp(search, "i");
      searchData = await userModel
        .find({
          $or: [
            { firstName: searchPattern },
            { role: searchPattern },
            { subrole: searchPattern }
          ]
        })
        .exec();
    }

    // console.log(searchData);
    res.json({ status: "ok", searchData: searchData });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: "error occurred" });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const id = req.query.q as string;
    // First, find the user
    const user = await userModel.findById(id);
    // Then, find the posts related to the user
    if (!user) {
      res.json({ status: "error", message: "User not found" });
      return;
    }
    const postData = await postModel.find({ user: id });
    // Combine user details and posts into one object
    const responseData = {
      ...user.toObject(),
      posts: postData,
    };
    res.json({ status: "ok", responseData: responseData });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: "error occurred" }); 
  }
};

const getLikes = async (req: Request, res: Response) => {
  try {
    const { userId, postId } = req.body;
    console.log(userId, postId)
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ status: "error", message: "Post not found" });
    }

    const likesIndex = post.likes.indexOf(userId);
    if (likesIndex === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(likesIndex, 1);
    }
    await post.save();
    res.json({ status: "success", message: "Like updated", Post:post });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
};


const getCountLikes=async(req:Request,res:Response)=>{
  try{
    const userIdCount = await postModel.aggregate([
      {
        $project: {
            count: {
                $size: {
                    $cond: [
                        { $isArray: "$likes" },
                        "$likes",
                        []
                    ]
                }
            }
        }
    }
    ])
     
    console.log(userIdCount)
  res.json({ status: "ok", Data: userIdCount}); 
  }catch(error){
    console.log(error.message);
    res.json({ status: "error", message: "error occurred" }); 
  }
}

const getComment=async(req:Request,res:Response)=>{
  try{
    const {comment,id,userId}=req.body
    console.log(comment,id,userId)

    const newComment={
      user:userId,
      content:comment
    }

    const updatedPost = await postModel.findByIdAndUpdate(id,
      {$push:{comments:newComment}},{new:true}
    )
    console.log(updatedPost)
    if (!updatedPost) {
      return res.status(404).json({ status: "error", message: "Post not found" });
    }

    res.status(200).json({ status: "success", message: "Comment added successfully", post: updatedPost });

  }catch(error){
    console.log(error.message);
    res.json({ status: "error", message: "error occurred" }); 
  }
}


const FetchComment=async(req:Request,res:Response)=>{
  try{
    const id=req.query.q as string
    console.log(id)


    const updatedPost = await postModel.findById({_id:id}).populate('comments.user')
    console.log(updatedPost)
   
   
    if (!updatedPost) {
      return res.status(404).json({ status: "error", message: "Post not found" });
    }

    res.status(200).json({ status: "success", message: "Comment added successfully", post: updatedPost });

  }catch(error){
    console.log(error.message);
    res.json({ status: "error", message: "error occurred" }); 
  }
}
export ={
    createPost,getPostData,Search,getUser,getLikes,getCountLikes,getComment,FetchComment
}