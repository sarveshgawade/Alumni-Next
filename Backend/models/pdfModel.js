import mongoose from 'mongoose'

const pdfSchema = new mongoose.Schema({
    name: String ,
    data: Buffer ,
    contentType : String
})

const PDF = mongoose.model('PDF',pdfSchema)
export default PDF