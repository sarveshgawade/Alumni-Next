import mongoose, { model } from 'mongoose'
import { config } from 'dotenv'
config()



const jobApplicationSchema = new mongoose.Schema({
    fullName:{
        type:'String',
        required: [true,`applicantName is a required field`] ,
        trim: true ,

    },
    email:{
        type:'String',
        required: [true,`Email is a required field`] ,
        trim: true ,
        unique: true ,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please fill in a valid email address'
          ] 

    },
    highestQualification:{
        type:'String',
        required: [true,`highestQualification is a required field`] ,
        trim: true ,
    },
    resume:{
        public_id :{ type: 'String'},
        secure_url :{ type: 'String'}
    },
    courseCompleted:{
        type:'String',
        trim: true ,
    },
    passoutBatch:{
        type:'Number',
        // required: [true,`passoutBatch is a required field`] ,
        trim: true ,
    },
    phoneNumber:{
        type: 'String',
        required: [true,'phoneNumber is required ']
    }

},{
    timestamps:true
})




const jobApplication = model('JobApplications',jobApplicationSchema)

export default jobApplication