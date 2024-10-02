import mongoose, { model } from 'mongoose'

const donationSchema = new mongoose.Schema({
    fullName:{
        type:'String',
        trim: true ,
        required: [true, 'Full name is required !']
    },
    email:{
        type:'String',
        trim: true ,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please fill in a valid email address'
          ] ,
        required: [true, 'Email is required !']

    },
    employer:{
        type:'String',
        trim: true ,
        required: [true, 'Employer is required !']
    },
    passoutYear:{
        type:'Number',
        trim: true ,
        required: [true, 'Passout batch is required !']
    },
    department:{
        type:'String',
        trim: true ,
        required: [true, 'Department is required !']
    },
    purpose:{
        type:'String',
        trim: true ,
        required: [true, 'Purpose is required !']
    },
    phoneNumber:{
        type: 'String',
        required: [true,'phoneNumber is required ']
    },
    donationAmount:{
        type: 'Number',
        required: [true,'donation amount is required ']
    },
    screenShot:{
        public_id :{ type: 'String'},
        secure_url :{ type: 'String'},
        // required: [true, 'Screenshot is required !']
    }

},{
    timestamps:true
})

const donation = model('donations',donationSchema)

export default donation