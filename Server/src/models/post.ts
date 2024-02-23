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
    }
})


const postModel=model<postData>('Post',postSchema)

export {postModel}
