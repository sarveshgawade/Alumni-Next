import jobApplication from '../models/jobApplicationModel.js' 
import cloudinary from 'cloudinary'
import fs from 'fs/promises'


const addNewJobApplication = async (req,res) => {
    try {
        const {
            fullName,
            email,   
            highestQualification,
            courseCompleted,
            passoutBatch,
            phoneNumber
        } = req.body

        console.log(req.file);
        

        if(!fullName || !email || !highestQualification || !courseCompleted || !passoutBatch || !phoneNumber){
                return res.status(500).json('All fields are required !') 
        }

        const existingJobApplication = await jobApplication.findOne({email})

        if(existingJobApplication){
            return res.status(500).json('JobApplication already exists !') 
        }

        const newJobApplcation = await jobApplication.create({
            fullName,
            email,   
            highestQualification,
            courseCompleted,
            passoutBatch,
            phoneNumber,
            resume: {
                public_id :'dummy',
                secure_url :'dummy'
            }
    
        })

        if(!newJobApplcation){
            return res.status(500).json('Error in creating JobApplication ! ') 
        }

        if(req.file){
            // console.log(req.file);
            try {
                const result = await cloudinary.v2.uploader.upload(req.file.path,{
                    folder: 'lms',
                    // width: 250,
                    // height: 250 ,
                    // gravity: 'faces',
                    // crop: 'fill'
                })
    
                if(result){
                    newJobApplcation.resume.public_id = result.public_id 
                    newJobApplcation.resume.secure_url = result.secure_url 
    
                    // remove file from server
                    fs.rm(`uploads/${req.file.filename}`)
                }
            } catch (error) {
                return res.status(500).json('Error in uploading image !')
            }
        }

        await newJobApplcation.save()

        res.status(200).json({
            success: true,
            message: 'Applied to job successfully!',
            newJobApplcation
        })


    } catch (error) {
        console.log(error);
        
    }
}



export {addNewJobApplication}