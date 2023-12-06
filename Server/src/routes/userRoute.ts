import express from 'express'
const Router=express.Router()
import userControllers from '../controllers/userController/Auth'
import verify from '../middleware/authMiddleware'
//User
Router.post('/signup',userControllers.creatUser)
Router.post('/otp',userControllers.verifyOtp)
Router.post('/resend_otp',userControllers.resendOtp)
Router.post('/login',userControllers.userLogin)
Router.get('/details/:id', verify, userControllers.userData);
Router.post('/refresh',userControllers.generateAcessToken)




export {Router}