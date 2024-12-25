import referral from "../models/referralModel.js";
import  user from '../models/userModel.js'

const addJobPost = async (req,res) => {
    try {
        const {companyName ,role,experience ,skills,link} = req.body 
        console.log(req.body);
        
        // if( !companyName || !role || !experience || !skills){
        //     return res.status(500).json('All fields are required !')
        // }

        const userfromDB = await user.findOne({email: req.user.email})
        // console.log(userfromDB.currentCompanyWorkingIn);
        
        const newJobPost = new referral({
            referredByName: req.user.fullName  ,
            referredByEmail: req.user.email ,
            companyName: companyName || userfromDB.currentCompanyWorkingIn  ,
            role,
            experience ,
            skills,
            link
        })

        const jobFromDB = await newJobPost.save()

        
        res.status(200).json({
            success: true ,
            message: "Jost post added successfully",
            jobFromDB
        })

    } catch (error) {
        console.log(error);
        
    }
}

const getAllReferrals = async (req,res)=> {
    try {
        const referrals = await referral.find({referredByEmail: {$ne: req.user.email}})
       
        
        
        res.status(200).json({
            success: true ,
            message : 'Referrals loaded successfully !',
            referrals
        })
    } catch (error) {
        console.log(error);
        
    }
}

const deleteJobPost = async(req,res)=> {
    try {
        const id = req.params.id ;

        const deletedJobPost = await referral.findByIdAndDelete(id) ;

        if(deleteJobPost){
            res.status(200).json({
                success: true ,
                message: 'Job post deleted successfully !',
                deleteJobPost
            })
        }
        
    } catch (error) {
        console.log(error);
        
    }
}


export {addJobPost,getAllReferrals,deleteJobPost}