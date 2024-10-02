import Event from "../models/eventModel.js";

const addNewEvent = async (req,res) => {
    try {
        const {
            eventName,
            description,
            clubName,
            date,
            tagline
        } = req.body

        console.log('Images',req.files.images);
        console.log('Thumbnail',req.files.thumbnail);
        // console.log(req.files.images);
        

        // if(!eventName || !description || !clubName || !date || !tagline || !req.files || req.files.length === 0
        // ){
        //     return res.status(400).json('All fields are required');
        // }


        
    } catch (error) {
        console.log(error);
        
    }
}

export {addNewEvent}
