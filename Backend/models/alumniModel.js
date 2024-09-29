import mongoose, { model } from 'mongoose'

const alumniSchema = new mongoose.Schema({
    fullName:{
        type:'String',
        trim: true ,

    },
    email:{
        type:'String',
        trim: true ,
        unique: true ,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please fill in a valid email address'
          ] 

    },
    courseCompleted:{
        type:'String',
        trim: true ,
    },
    passoutBatch:{
        type:'Number',
        trim: true ,
    },
    currentCompanyWorkingIn:{
        type:'String',
        trim: true ,
    },
    currentCompanyWorkinInRole:{
        type:'String',
        trim: true ,
    },
    phoneNumber:{
        type: 'String',
        required: [true,'phoneNumber is required ']
    }

},{
    timestamps:true
})

const alumni = model('alumni',alumniSchema)

export default alumni