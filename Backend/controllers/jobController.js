import  Job from '../models/jobModel.js'
import cloudinary from 'cloudinary'
import fs from 'fs/promises'

const addNewJob = async (req,res) => {
    try {
        const {
            companyName,
            description,   
            jobRole,
            skills,
            jobType,
            link
        } = req.body

        // console.log(req.body);
        

        if(!companyName || !description || !jobRole || !skills || !jobType){
                return res.status(500).json('All fields are required !') 
        }

        const existingJob = await Job.findOne({companyName})

        if(existingJob){
            return res.status(500).json('Company already exists !') 
        }

        const newJob = await Job.create({
            companyName,
            description,   
            jobRole,
            skills,
            jobType,
            thumbnail:{
                public_id:'Dummy',
                secure_url:'Dummy'
            },
            link
    
        })

        if(!newJob){
            return res.status(500).json('Error in creating company ! ') 
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
                    newJob.thumbnail.public_id = result.public_id 
                    newJob.thumbnail.secure_url = result.secure_url 
    
                    // remove file from server
                    fs.rm(`uploads/${req.file.filename}`)
                }
            } catch (error) {
                return res.status(500).json('Error in uploading image !')
            }
        }

        await newJob.save()

        res.status(200).json({
            success: true,
            message: 'New Job Added Successfully!',
            newJob
        })


    } catch (error) {
        console.log(error);
        
    }
}

const getAllJobsList = async (req,res) => {
    try {
        const jobList = await Job.find()

        res.status(200).json({
            success: true ,
            message: 'Found all listed jobs',
            jobList
        })
    } catch (error) {
        console.log(error);
        
    }
}

const deleteJob = async (req,res)=> {
    try {
        const {id} = req.params

        const job = await Job.findById(id)

        if(!job){
            return res.status(500).json('Could not find job with provided ID !')
        }

        await Job.findByIdAndDelete(id)

        res.status(200).json({
            success: true ,
            message: 'Job deleted successfully !'
        })
        
    } catch (error) {
        console.log(error);
        
    }
}

export {addNewJob,getAllJobsList,deleteJob}