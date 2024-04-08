import mongoose, {Document,model,Types,Schema} from 'mongoose'
import { Message } from 'interfaces/database'


interface newMessage extends Message, Document {}

const messageSchema= new Schema<Message>({
    member:{
     type:[]
    },
   
},
{
 timestamps:true       
}

)

const messageModel = model<newMessage>('Message', messageSchema);

export { messageModel };

