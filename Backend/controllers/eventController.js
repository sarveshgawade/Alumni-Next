import Event from "../models/eventModel.js";
import cloudinary from 'cloudinary'

const addNewEvent = async (req,res) => {
    try {
        const {
            eventName,
            description,
            clubName,
            date,
            tagline
        } = req.body

        

        if(!eventName || !description || !clubName || !date || !tagline || !req.files || req.files.length === 0
        ){
            return res.status(400).json('All fields are required');
        }

        const newEvent = await Event.create({
            eventName,clubName,date,description,tagline
        })

        if(!newEvent){
            return res.status(500).json('Error in creating new event !')
        }
        
        
       

        // console.log('Images',imagePaths);

        // for uploading all images and thumbnail
        try {

            if( req.files.images !== undefined){
                const imagePaths = await Promise.all(
                    req.files.images.map(img => img.path )
                )
    
                const result = await Promise.all(
                    imagePaths.map(path => cloudinary.v2.uploader.upload(path, {folder:'lms'}))
                )
                newEvent.images = result
            }

            const thumbnailResult = await cloudinary.v2.uploader.upload(req.files.thumbnail[0].path,{folder:'lms'})

           
            newEvent.thumbnail = thumbnailResult

            await newEvent.save()

            res.status(200).json({
                success: true ,
                message: 'New Event Registered !',
                newEvent
            })
           
            
        } catch (error) {
            console.log(error);
            
        }

        
    } catch (error) {
        console.log(error);
        
    }
}

const getAllEvents = async (req,res) => {
    try {
        const events = await Event.find({})

        res.status(200).json({
            success: true ,
            message: 'Events loaded successfully !',
            events
        })
    } catch (error) {   
        console.log(error);
        
    }
}

export {addNewEvent,getAllEvents}
