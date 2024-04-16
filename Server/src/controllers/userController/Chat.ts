import { messageModel } from "../../models/messagSchema";
import { Request, Response } from "express";
import { userModel } from "../../models/users";
import { read } from "fs";
import { conversationModel } from "../../models/converstaionSchema";

const createChat = async (req: Request, res: Response) => {
  const { senderId, userId } = req.body;
  // console.log(senderId, userId);

  try {
      // Check for existing chat with members in either order
      const existingChat = await messageModel.findOne({
        member: { $all: [senderId, userId] } 
      });
    console.log(existingChat)
      if (existingChat) {
          // If chat already exists, return a message indicating it
          return res.json({ status: "ok", message: "Chat already exists" });
      }

      // Create a new chat
      const newChat = new messageModel({
          member: [userId, senderId] // This line sets the order to [userId, senderId]
      });

 ;
      // Save the new chat
      await newChat.save();
   
      res.json({ status: "ok", message: "Created successfully" });
  } catch (error) {
      // Handle any errors
      console.log(error.message);
      res.json({ status: "error", message: "An error occurred" });
  }
};




const userChats = async (req: Request, res: Response) => {
  try {
    // console.log(req.params.id)
    // console.log("hi sree")
    const chat = await messageModel.find({
      member: { $in: [req.params.id] },
    });
    res.status(200).json({status:"ok",chat:chat});
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: "An error occured" });
  }
};

const findChat = async (req: Request, res: Response) => {
  try {
    const chat = await messageModel.findOne({
      member: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: "An error occured" });
  }
};

const Allchat = async (req: Request, res: Response) => {
  try {
    const id = req.query.q;
    const chat = await messageModel.find();

    const secondMembers:any = chat
      .map((item) => item.member[0] == id ? item.member[1] : item.member[0])
      .filter((member) => member !== "");

    const Chatid = chat
      .map((item) => item.member[0] == id ? item._id : "")
      .filter((member) => member !== "");

    const data = await userModel.find({ _id: { $in: secondMembers } });
    res.status(200).json({ status: "ok",chat:data});
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: "An error occurred" });
  }
};

const singleChat= async (req: Request, res: Response) => {
  try {
    const id = req.query.q;
    const senderId = req.query.senderId;
  //  console.log(senderId)

   const chat = await messageModel.findOne({
    member: { $all: [senderId,id] } 
  });
  console.log(chat)

  const Allmessage= await conversationModel.find({chatId:chat?._id})
  // console.log(Allmessage)
  res.status(200).json({ status: "ok", chat: chat, allMessages: Allmessage})
 


  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: "An error occurred" });
  }
};









export = {
  createChat,
  userChats,
  findChat,
  Allchat,
  singleChat
};
