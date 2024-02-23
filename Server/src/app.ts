import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import * as path from 'path'
import dotenv from 'dotenv'
import {connectToMongoDB} from './utils/base'
import { Router } from './routes/userRoute'
import session from 'express-session'
import passport from "passport"
import { Request, Response ,NextFunction} from "express";
dotenv.config()

var port=process.env.PORT||8080
console.log(port)
const app = express()



app.use(cors())
app.use(express.json({ limit: '70mb' }));
app.use(express.urlencoded({ limit: '70mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())



connectToMongoDB().then(()=>{
    app.listen(port,()=>{
        console.log(`server started on sree port ${port}`)
    })
}) .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });

  app.use("/",Router)