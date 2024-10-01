import donation from "../models/donationModel.js";
import cloudinary from 'cloudinary'
import fs from 'fs/promises'


const donate = async(req,res)=> {
    try {
        const {
            fullName,
            email,
            employer,
            passoutYear,
            department,
            purpose,
            phoneNumber,
            donationAmount
        } = req.body

        if(!fullName || !email || !employer || !passoutYear || !department || !purpose || !phoneNumber || !donationAmount){
            return res.status(500).json('All fields are required !') 
        }

        const newDonation = await donation.create({
            fullName,
            email,
            employer,
            passoutYear,
            department,
            purpose,
            phoneNumber,
            donationAmount
        })

        if(!newDonation){
            return res.status(500).json('Donation failed !')
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
                    newDonation.screenShot.public_id = result.public_id 
                    newDonation.screenShot.secure_url = result.secure_url 
    
                    // remove file from server
                    fs.rm(`uploads/${req.file.filename}`)
                }
            } catch (error) {
                return res.status(500).json('Error in uploading image !')
            }
        }

        await newDonation.save()

        res.status(200).json({
            success: true,
            message: 'New Donation Added Successfully!',
            newDonation
        })

    } catch (error) {
        console.log(error);
        
    }
}

const getAllDonationList = async(req,res)=> {
    try {
        
        const donationList = await donation.find({})

        if(!donationList){
            return res.status(500).json('Error in fetching data !') 
        }

        res.status(200).json({
            success: true,
            message: 'All donations fetched successfully !',
            donationList
        })

    } catch (error) {
        console.log(error);
        
    }
}

export {donate,getAllDonationList}
