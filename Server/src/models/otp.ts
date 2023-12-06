import { Document, Schema, model } from 'mongoose';
import { Otp } from '../interfaces/database';


interface newOtp extends Otp, Document {}

const otpSchema = new Schema<Otp>({
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '20m'
    },
    email:{
        type:String,
        required:true
    }
});

const otpModel = model<newOtp>('Otp', otpSchema);

export { otpModel };
