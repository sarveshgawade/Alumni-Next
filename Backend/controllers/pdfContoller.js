import PDF from '../models/pdfModel.js'
import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({storage})

const uploadPDF = async (req,res)=>{
    try {
        const {
            name,
            currentCompany,
            currentRole,
            experience,
            salary,
            expectedSalary,
            noticePeriod,
            email,
            phoneNo,
            referredByEmail
        } = req.body
        
        if(!name || !currentCompany || !currentRole || !experience || !salary || !expectedSalary || !noticePeriod || !email || !phoneNo || !referredByEmail){
            return res.status(500).json('All fields are required !')
        }

        
        // console.log(req.body);
        // console.log(req.file);
        
        const {originalname,buffer,mimetype} = req.file

        const newPdf = new PDF({
            name: originalname,
            data: buffer ,
            contentType : mimetype,
            name,
            currentCompany,
            currentRole,
            experience,
            salary,
            expectedSalary,
            noticePeriod,
            email,
            phoneNo,
            referredByEmail
        })

        await newPdf.save()

        res.status(200).json({
            success : true ,
            message : "PDF uploaded successfully",
            newPdf
             
        })

    } catch (error) {
        console.log(error);
        
    }
}

const getPDF = async (req,res) => {
    try {
        const id = req.params.id
        if(!id) return res.status(500).json('Please provide ID')

        const pdf = await PDF.findById(id)

        res.status(200).json({
            success : true ,
            pdfName : pdf.name ,
            contentType: pdf.contentType ,
            pdfData : pdf.data.toString('base64')
        })
    } catch (error) {
        console.log(error);
        
    }
}

const getAppliedProfiles = async (req,res) => {
    try {

        const {referredByEmail} = req.body
        console.log(referredByEmail);
                
        if(!referredByEmail) return res.status(500).json('Reffered by email is required !')

        let documents = await PDF.find({referredByEmail})

        documents =  documents.map(el => {
            return {
                ...el.toObject(),
                data: el.data.toString('base64')
            }
         })

        res.status(200).json({
            success: true ,
            message : 'Profiles found' ,
            documents
        })
        
        
    } catch (error) {
        console.log(error);
    }
}


export {uploadPDF,getPDF,getAppliedProfiles}
