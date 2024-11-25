import mongoose, { model } from 'mongoose'

const referralSchema = new mongoose.Schema({
    referredByName : String ,
    referredByEmail: String ,
    companyName: String ,
    role: String,
    experience : String,
    skills: String,
    link: String ,
    
},{
    timestamps:true
})

const referral = model('referral',referralSchema)

export default referral