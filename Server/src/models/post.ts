import mongoose, {Document,model,Types,Schema} from 'mongoose'
import { Post } from 'interfaces/database'

interface postData extends Post,Document{}

const postSchema= new Schema <Post>({
    user:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"User",
     required:true
    },
    text:{
        type:Schema.Types.Mixed
    },
    Url:{
        type:String
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],

    comments: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'User', 
            required: true,
          },
          content: {
            type: String,
            required: true,
          },
          replies: [
            {
              user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true,
              },
              content: {
                type: String,
                required: true,
              },
            },
          ],
        },
      ],

    createdAt:{
        type:Date,
        default: Date.now 
    },
    
    
})


const postModel=model<postData>('Post',postSchema)

export {postModel}
