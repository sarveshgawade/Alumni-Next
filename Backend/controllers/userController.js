import user from "../models/userModel.js"
import sendMail from '../config/sendMail.js'
import cloudinary from 'cloudinary'
// import otpGenerator from 'otp-generator'
// import twilio from 'twilio'
import fs from 'fs/promises'
import { configDotenv } from 'dotenv';
configDotenv()

const cookieOptions = {
    maxAge: 1*24*60*60*1000, // 1 day
    httpOnly: true,
    secure: false
}

// const client = new twilio(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN)


const register = async(req,res,) =>{
    // console.log('EEEEEE');
    
    
    const {fullName,email,password,role,courseCompleted,passoutBatch,currentCompanyWorkingIn,currentCompanyWorkinInRole,phoneNumber} = req.body

    if(!fullName || !email || !password || !phoneNumber){
       return res.status(500).json('All fields are required !') 
    }

    const userExists = await user.findOne({email})

    if(userExists){
        return res.status(500).json('User already exists !') 
    }

    const newUser = await user.create({
        fullName,
        email,
        password,
        avatar:{
            public_id: email,
            secure_url: 'https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg'
        },
        role,
        courseCompleted,
        passoutBatch,
        currentCompanyWorkingIn,
        currentCompanyWorkinInRole,
        phoneNumber
    })

    if(!newUser){
        return res.status(500).json('User registration failed !')
    }

    // IMAGE  FILE UPLOAD
    if(req.file){
        // console.log(req.file);
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder: 'lms',
                width: 250,
                height: 250 ,
                gravity: 'faces',
                crop: 'fill'
            })

            if(result){
                newUser.avatar.public_id = result.public_id 
                newUser.avatar.secure_url = result.secure_url 

                // remove file from server
                fs.rm(`uploads/${req.file.filename}`)
            }
        } catch (error) {
            return res.status(500).json('Error in uploading image !')
        }
    }


    // save user in DB
    await newUser.save()

    //Register SuccessFully Mail
    try {
        const subject = `Welcome to Alumni-Next - Your Ultimate Hub for Alumni & Students at Thakur College of Science & Commerce`;
const message = `
    <h3> Dear ${fullName}, </h3><br>
    <br>We are thrilled to welcome you to Alumni-Next, the official platform connecting alumni and students of Thakur College of Science & Commerce, Thakur Village, Kandivali! 🎉🎊
    <br><br>
    <p>Your registration has been successfully completed, and you are now part of a vibrant community where alumni and students can connect, collaborate, and grow together. Whether you are here to seek career guidance, post job or internship opportunities, or participate in various events and reunions, we have something for everyone!</p>
    <br>
    <p>Students can benefit from the wealth of experience shared by alumni, while alumni can offer their expertise, share insights, and post opportunities to help shape the future generation of Thakur College graduates.</p>
    <br>
    <p>If you have any questions or need assistance, feel free to reach out to us at: </p>
    <ul>
        <li>Tel: 2887 0627, 2846 2565</li>
        <li>Fax: 2886 8822</li>
    </ul>
    <br>
    <p>We look forward to fostering meaningful connections and supporting both alumni and students on this platform. Welcome aboard!</p>
`;


       sendMail(email,subject,message)
    } catch (error) {
        console.error('Error :',error)
    }


    // token generation
    const token = await newUser.generateJWTtoken()

    // put token into cookie
    res.cookie('token',token,cookieOptions) 

    // console.log(token);
    

    newUser.password = undefined
    res.status(200).json({
        success: true ,
        message: `User registered successfully`, 
        newUser
    })
}

const login = async (req,res) =>{

    try {
        const {email,password} = req.body

        if(!email || !password){
            return res.status(500).json('All fields are required !') 
        }

        // getting password explicitly because it was selected as false in schema
        const existingUser = await user.findOne({
            email
        }).select('+password')  

        if(!existingUser || !(await existingUser.comparePassword(password))){
            return res.status(500).json('Email & password wont match !') 
        }

        const token = await existingUser.generateJWTtoken()
        res.cookie('token',token,cookieOptions)

        // console.log(token);
        

        existingUser.password = undefined
        
        res.status(200).json({
            success: true,
            message: `User logged in successfully`,
            existingUser
        })
    } catch (e) {
        return res.status(500).json({
            success: false ,
            message: e.message
        })
    }
    

}

async function getProfile(req,res,next){
    try {
        // console.log(req.user);
        
        const userID = req.user.id

        const userProfile = await user.findById(userID)

        if(!userProfile) {res.status(500).json('User not found !')}

        res.status(200).json({
            success: true ,
            message: 'User deatils found !',
            userProfile
        })

    } catch (error) {
        console.log(error);
    }
}

async function logout(req,res){
    try {
        res.cookie('token',null,{
            secure: true ,
            maxAge: 0 ,
            httpOnly: true
        })

        res.status(200).json({
            success: true ,
            message: 'User logged out'
        })
    } catch (error) {
        console.log(error);
    }
}

async function changePassword(req,res){
    try {
        const {oldPassword, newPassword} = req.body
        const userID = req.user.id

        if(!oldPassword || !newPassword){return res.status(500).json('All fields are required')}

        if(oldPassword == newPassword) {return res.status(500).json('Old and New password are same')}

        const User = await user.findById(userID).select('+password')

        if(!User) {return res.status(500).json('User not found')}

        const isPasswordCorrect = await User.comparePassword(oldPassword)

        if(!isPasswordCorrect){return res.status(500).json('Old  password is invalid')}

        User.password = newPassword

        await User.save()

        User.password = undefined

        res.status(200).json({
            success: true ,
            message: 'Password changed',
        })
    } catch (error) {
        console.log(error);
    }
}

const updateUser = async (req,res) =>{
    const {fullName} = req.body
    const id = req.user.id    

    // if(!fullName || !id){
    //     return res.status(500).json('All fields are required')
    // }

    const userExists = await user.findById(id)

    if(!userExists){
        return res.status(500).json('User does not exists')
    }

    if(fullName){
        userExists.fullName = fullName
    }

    if(req.file){
        await cloudinary.v2.uploader.destroy(userExists.avatar.public_id)

        // copy paste from register function
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder: 'lms',
                width: 250,
                height: 250 ,
                gravity: 'faces',
                crop: 'fill'
            })

            if(result){
                userExists.avatar.public_id = result.public_id 
                userExists.avatar.secure_url = result.secure_url 

                // remove file from server
                fs.rm(`uploads/${req.file.filename}`)
            }
        } catch (error) {
            return next(new AppError(500,`Cannot upload image, please try again`))
        }   
    }

    await userExists.save({ validateModifiedOnly: true });


    res.status(200).json({
        success: true ,
        message: `Profile changed successfully`,
        userExists
    })
}

const check = async (req,res) => {
    res.status(200).json('Access granted !')
}

export {register,login,getProfile,logout,changePassword,updateUser,check}
