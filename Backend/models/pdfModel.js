import mongoose from 'mongoose'

const pdfSchema = new mongoose.Schema({
    name: String ,
    data: Buffer ,
    contentType : String,
    name : String,
    currentCompany: String,
    currentRole: String,
    experience: String,
    salary: String,
    expectedSalary: String ,
    noticePeriod: String,
    email: String,
    phoneNo: String,
    referredByEmail: String
})

const PDF = mongoose.model('PDF',pdfSchema)
export default PDF