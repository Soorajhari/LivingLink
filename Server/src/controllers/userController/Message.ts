import { conversationModel } from "../../models/converstaionSchema";
import { Request, Response } from "express";

const addMessage = async (req: Request, res: Response) => {
  const { chatId, senderId, text } = req.body;
  // console.log(req.body);
  const message = new conversationModel({
    chatId,
    senderId,
    text,
  });
  try {
    const result = await message.save();
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: "An error occured" });
  }
};

const getMessage = async (req: Request, res: Response) => {
  const id= req.query.q;
  // console.log(id + 'sreee')
  try {
    const result = await conversationModel.find({chatId:id  });
    // console.log(result)
    res.status(200).json({status:"ok",chat:result});
  } catch (error) {}
};

const lastMessage=async(req: Request, res: Response)=>{
  try{
  const reciverId=req.body.reciverId
  console.log(reciverId)
  }catch(error){
    console.log(error.message);
    res.json({ status: "error", message: "An error occured" });
  }
}











export = {
  addMessage,
  getMessage,
  lastMessage
};
