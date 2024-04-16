import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import * as path from 'path'
import dotenv from 'dotenv'
import {connectToMongoDB} from './utils/base'
import { Router } from './routes/userRoute'
const app = express()
import { createServer } from 'node:http';
const server = createServer(app);
dotenv.config()
import { Server as SocketIOServer,Socket, ServerOptions } from 'socket.io'

var port=process.env.PORT||8080
console.log(port)




app.use(cors())
app.use(express.json({ limit: '70mb' }));
app.use(express.urlencoded({ limit: '70mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())

interface User {
  userId: string;
  socketId: string;
}

const io = new SocketIOServer(server, {
    cors: {
      origin: 'http://localhost:3000',  
      methods: ['GET', 'POST'],
    },
  } as ServerOptions);

 
  let activeUsers: User[] = [];

  io.on("connection", (socket: Socket) => {
    // add new User
    socket.on("new-user-add", (newUserId: string) => {
      // if user is not added previously
      if (!activeUsers.some((user) => user.userId === newUserId)) {
        activeUsers.push({ userId: newUserId, socketId: socket.id });
        console.log("New User Connected", activeUsers);
      }
      // send all active users to new user
      io.emit("get-users", activeUsers);
    });


    
    // console.log(activeUsers)
  
    socket.on("disconnect", () => {
      // remove user from active users
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
      console.log("User Disconnected", activeUsers);
      // send all active users to all users
      io.emit("get-users", activeUsers);
    });
  
    // send message to a specific user
    socket.on("send-message", (data: { receiverId: string }) => {
      const { receiverId} = data
      console.log(receiverId + "giiiiii")
      const user = activeUsers.find((user) => user.userId == receiverId);
      console.log(user);
      // console.log("Data: ", data);
      if (user) {
        io.to(user.socketId).emit("recieve-message", data);
      }
    });
  });
  
  

connectToMongoDB().then(()=>{
    server.listen(port,()=>{
        console.log(`server started on port ${port}`)
    })
}) .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });

  app.use("/",Router)