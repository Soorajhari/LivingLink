import express from 'express'
const Router=express.Router()
import userControllers from '../controllers/userController/Auth'
import postControllers from '../controllers/userController/Post'
import chatControllers from '../controllers/userController/Chat'
import messageControler from '../controllers/userController/Message'
import profileController from '../controllers/userController/Profile'
import verify from '../middleware/authMiddleware'
import  upload from '../middleware/multer'
//User
Router.post('/signup',userControllers.creatUser)
Router.post('/otp',userControllers.verifyOtp)
Router.post('/resend_otp',userControllers.resendOtp)
Router.post('/login',userControllers.userLogin)
Router.get('/details/:id', verify, userControllers.userData);
Router.post('/refresh',userControllers.generateAcessToken)
Router.post('/post',postControllers.createPost)
Router.get('/post-data',postControllers.getPostData)
Router.post('/chat',chatControllers.createChat)
Router.get(":/userId",chatControllers.userChats)
Router.get("/find/:firstId/:secondId",chatControllers.findChat)
Router.post("/message",messageControler.addMessage)
Router.get("/chat/:id",messageControler.getMessage)
Router.get("/fetch-user",postControllers.Search)
Router.get("/profile-user",postControllers.getUser)
Router.get("/user-profile",profileController.getUserdata)
Router.get("/user-data",profileController.getAllusers)
Router.post("/follow",profileController.Followers)
Router.get("/follow-data",profileController.FollowersData)
Router.post("/unfollow",profileController.Unfollowers)
Router.post("/upload-profile", upload.single("file"),profileController.uploadData)
Router.post("/likes", postControllers.getLikes)
Router.get("/likes-count", postControllers.getCountLikes)
Router.post("/comment", postControllers.getComment)
Router.get("/get-comment", postControllers.FetchComment)



export {Router}