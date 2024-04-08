import { Types } from "mongoose";


export interface Otp {
    otp: string
    createdAt: Date;
    email:string
}


export  interface User{
    firstName:string,
    lastName:string,
    email:string,
    mobile:number,
    password:string,
    location:string,
    profileImage:string,
    role:string,
    subrole:string,
    followers:string[],
    following:string[],
    createdAt:Date
 }
 
 export interface Post{
    user:Types.ObjectId,
    text:string|number,
    Url:string,
    createdAt:Date
    likes:Types.ObjectId[]
    comments: Comment[];

 }

 export interface Message{
    member:Types.Array<any>
 }


 
 export interface Converstaion{
   chatId:string,
   senderId:string,
   text:string
   
 }

 interface CommentReply {
   user: Types.ObjectId;
   content: string;
 }
 
 interface Comment {
   user: Types.ObjectId;
   content: string;
   replies: CommentReply[];
 }
 
