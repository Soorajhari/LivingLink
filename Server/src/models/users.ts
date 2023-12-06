import {Document,Schema,model} from 'mongoose'
import { User } from '../interfaces/database'


interface userDocument extends User, Document{}

const userSchema=new Schema<User>({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email: {
        type: String,
        trim: true,
        unique: true ,
        required: true
      },
    mobile:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profileImage:{
        type:String,
        
    },
   role:{
        type:String,

    },
 subrole:{
    type:String
    
 },

    followers:[{
        type:String
    }],

    following:[{
        type:String
    }],

    createdAt:{
        type:Date,
        default:Date.now
    }


})


 const userModel=model<userDocument>('User',userSchema)

export {userModel}
