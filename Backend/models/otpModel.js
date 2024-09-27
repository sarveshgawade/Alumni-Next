import mongoose, { get, set } from "mongoose";

const otpSchema = new mongoose.Schema({
    phoneNumber:{
        type : String,
        required: [true,`phoneNumberis Required`],
    },
    otp:{
        type : String,
        required: [true,`OTP Required`],
    },
    otpExpiry:{
        type: Date,
        default: Date.now,
        get: (otpExpiry)=> otpExpiry.getTime() ,
        set: (otpExpiry=> new Date(otpExpiry))
    }
 
    
},{timestamps:true})

const otp = mongoose.model('OTP',otpSchema)

export default otp