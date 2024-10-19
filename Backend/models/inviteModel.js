import mongoose, { model } from 'mongoose'

const invitesSchema = new mongoose.Schema({
    invites:[{
        email: {
            type: String,
            trim: true,
            required: [true, 'Email is required!'],
        },
        phoneNumber: {
            type: String,
            trim: true,
            required: [true, 'Phone number is required!'],
        },
        name: {
            type: String,
            trim: true,
            required: [true, 'Name is required!'],
        },
    }],
    date:{
        type:'Date',
        trim: true ,
        required: [true, 'date is required !']

    },
    time:{
        type:'String',
        trim: true ,
        required: [true, 'time is required !']
    },
    location:{
        type:'String',
        trim: true ,
        required: [true, 'location is required !']
    },
    degree:{
        type:'String',
        trim: true ,
        required: [true, 'degree is required !']
    },
    specialization:{
        type:'String',
        trim: true ,
        required: [true, 'specialization is required !']
    }
},{
    timestamps:true
})

const invites = model('invites',invitesSchema)

export default invites