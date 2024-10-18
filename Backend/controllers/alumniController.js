import alumni from "../models/alumniModel.js";


const registerNewAlumni = async (req,res)=> {
    try {
        const {
            fullName,email,degree,specialization,passoutBatch,currentCompanyWorkingIn,currentCompanyWorkingInRole,phoneNumber
        } = req.body

        // console.log(req.body);
        

        if(!fullName || !email || !degree || !specialization || !passoutBatch || !currentCompanyWorkingIn || !currentCompanyWorkingInRole || !phoneNumber){
            return res.status(500).json('All fields are required !') 
        }

        const existingAlumni = await alumni.findOne({email})

        if(existingAlumni){
            return res.status(500).json('Alumni already exists !') 
        }

        const newAlumni = await alumni.create({
            fullName,email,degree,specialization,passoutBatch,currentCompanyWorkingIn,currentCompanyWorkingInRole,phoneNumber
        })

        if(!newAlumni){
            return res.status(500).json('Alumni registration failed !')
        }

        await newAlumni.save()

        res.status(200).json({
            success: true ,
            message: `Alumni registered successfully`, 
            newAlumni
        })

    } catch (error) {
        console.log(error);
        
    }
}

const getAllAlumni = async(req,res) => {
    try {
        const alumnis = await alumni.find() 

        if(!alumnis){
            return res.status(500).json('Error in fetching alumni data!') 
        }

        res.status(200).json({
            success: true ,
            message: 'Alumni data fetched successfully !',
            alumnis
        })
    } catch (error) {
        console.log(error);
        
    }
}

export {registerNewAlumni,getAllAlumni}