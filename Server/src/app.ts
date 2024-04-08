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
import { Server as SocketIOServer, ServerOptions } from 'socket.io'

var port=process.env.PORT||8080
console.log(port)




app.use(cors())
app.use(express.json({ limit: '70mb' }));
app.use(express.urlencoded({ limit: '70mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())

const io = new SocketIOServer(server, {
    cors: {
      origin: 'http://localhost:3000',  
      methods: ['GET', 'POST'],
    },
  } as ServerOptions);

  io.on("connection", (socket) => {
    console.log("We are live and connected");
    console.log(socket.id);
  });
  
  

connectToMongoDB().then(()=>{
    server.listen(port,()=>{
        console.log(`server started on port ${port}`)
    })
}) .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });

  app.use("/",Router)