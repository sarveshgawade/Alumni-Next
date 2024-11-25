import PDF from '../models/pdfModel.js'
import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({storage})

const uploadPDF = async (req,res)=>{
    try {
        // console.log(req.file);
        
        const {originalname,buffer,mimetype} = req.file

        const newPdf = new PDF({
            name: originalname,
            data: buffer ,
            contentType : mimetype
        })

        await newPdf.save()

        res.status(200).json({
            success : true ,
            message : "PDF uploaded successfully",
             
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
export {uploadPDF,getPDF}
