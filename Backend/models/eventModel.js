import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    eventName:{
        type : String,
        required: [true,`Event Name is Required`],
        trim:true
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
    clubName:{
        type: String,
        required: [true,`Club name is required`]
    },
    date: {
        // type: Date, 
        type: String, 
        required: [true, 'Date are required']
    },
    tagline:{
        type : String,
        required: [true, 'Tagline are required']
    },
    images:[{
        public_id :{ type: 'String'},
        secure_url :{ type: 'String'}
    }]

    
},{timestamps:true})

const Event = mongoose.model('Event',eventSchema)

export default Event