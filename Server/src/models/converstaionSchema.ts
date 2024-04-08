import mongoose, {Document,model,Types,Schema} from 'mongoose'
import { Converstaion } from 'interfaces/database'



interface newConverstaion extends Converstaion, Document {}

const conversationSchema= new Schema<Converstaion>({
    chatId:{
     type:String
    },
    senderId:{
        type:String
    },
    text:{
        type:String
    }
   
},
{
 timestamps:true       
}

)

const conversationModel = model<newConverstaion>('Conversation', conversationSchema);

export { conversationModel};
