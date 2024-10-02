import mongoose, { model } from 'mongoose'


const imageUploadSchema = new mongoose.Schema({

    images:[{
        public_id :{ type: 'String'},
        secure_url :{ type: 'String'}
    }],
    tempID: {
        type: 'String'
    }

},{
    timestamps:true
})



const ImageUpload = model('images',imageUploadSchema)

export default ImageUpload