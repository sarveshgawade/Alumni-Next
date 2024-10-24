import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    companyName:{
        type : String,
        required: [true,`Company Name is Required`],
        trim:true,
        maxLength:[60,`max length of title is 60 characters only`]
    },
    description:{
        type: String,
        required: [true,`Description is required`]
    },
    thumbnail: {
        public_id: {
          type: String,
        },
        secure_url: {
          type: String,
        }
    },
    jobRole:{
        type: String,
        required: [true,`job role is required`]
    },
    skills: [{
        // type: Date, 
        type: String, 
        required: [true, 'Skills are required']
    }],
    jobType:{
        type : String,
        required: [true, 'job type are required']
    },
    link:{
        type : String,
    }
    
},{timestamps:true})

const Job = mongoose.model('Jobs',JobSchema)

export default Job