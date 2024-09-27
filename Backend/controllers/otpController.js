import Otp from "../models/otpModel.js";
import otpGenerator from 'otp-generator'
import twilio from 'twilio'
import { configDotenv } from 'dotenv';
configDotenv()

const client = new twilio(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN)

const sendOTP = async(req,res)=> {
    try {
        const {phoneNumber} = req.body

        const OTP = otpGenerator.generate(6,{
            lowerCaseAlphabets: false,
            specialChars: false,
            upperCaseAlphabets: false
        })

        console.log(`generated otp : ${OTP}`);

        const currentTime = new Date()

        const response = await Otp.findOneAndUpdate(
            {phoneNumber},
            {otp: OTP, otpExpiry: new Date(currentTime.getTime())},
            {upsert: true,new: true ,setDefaultsOnInsert: true}
        )

        // console.log(response);

        
        

        const response1 = await client.messages.create({
            from : process.env.TWILIO_PHONE_NUMBER,
            to: phoneNumber,
            body: `AlumniNext your OTP is : ${OTP} `
        })

        // console.log(response1);
        
        if(response){
            res.status(200).json({
                success: true ,
                message: `OTP sent successfully : ${OTP}`
            })

        }
        
        
    } catch (error) {
        console.log(error);
        
    }
}

const verifyOTP = async(req,res)=>{
    try {
        const {phoneNumber,otp} = req.body

        // console.log({phoneNumber,otp});
        

        const dbDoc = await Otp.findOne({phoneNumber, otp}) 

        // console.log(dbDoc);
        

        if (!dbDoc) {
            // If no matching document is found, send a failure response
            return res.status(500).json({
                success: false,
                message: 'Invalid OTP or phone number',
            });
        }

        // If the document is found, send success response
        res.status(200).json({
            success: true,
            message: 'OTP verified',
        });
        
    } catch (error) {
        console.log(error);
        
    }
}

export {sendOTP,verifyOTP}
