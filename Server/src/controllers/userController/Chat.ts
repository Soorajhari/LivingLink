import { messageModel } from "../../models/messagSchema";
import { Request, Response } from "express";

const createChat = async (req: Request, res: Response) => {
  const newChat = new messageModel({
    member: [req.body.senderId, req.body.reciverId],
  });
  try {
    await newChat.save();
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: "An error occured" });
  }
};

const userChats = async (req: Request, res: Response) => {
  try {
    const chat = await messageModel.find({
      member: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
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

export = {
  createChat,
  userChats,
  findChat,
};
