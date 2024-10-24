import alumni from "../models/alumniModel.js";
import invite from "../models/inviteModel.js";
import twilio from 'twilio'
import { configDotenv } from 'dotenv';
import sendMail from "../config/sendMail.js";
configDotenv()

const client = new twilio(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN)

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

const getAlumniByDegreeAndSpecialization = async (req,res) => {

    
    
    try {
        const {degree,specialization} = req.body
        // console.log("req.body");
        if(!degree || !specialization){
            return res.status(500).json('All fields are required !') 
        }

        const filteredAlumni = await alumni.find({degree,specialization}) 

        if(!filteredAlumni) return res.status(500).json('Error in fetching alumni data !') 

        if(filteredAlumni.length === 0) return res.status(500).json('No alumni found with given data !')

        return res.status(200).json({
            success: true ,
            message: 'Alumni Found',
            filteredAlumni
        })
        
    } catch (error) {
        console.log(error);
        
    }
}

const sendInvite = async(req, res) => {
    try {
        const { invites,date,time,location,degree,specialization} = req.body;
        
        if (!invites || !date || !time || !location || !degree || !specialization) {
            return res.status(400).json('All fields are required');
        }

        const ifExistingInvite = await  invite.findOne({date})

        if(ifExistingInvite){
            return res.status(400).json('Invites already sent for given date');
        }

        const newInvite = await invite.create({
            invites,date,time,location,degree,specialization
        })

        if(!newInvite){
            return res.status(400).json('Error in creating new invite');
        }

        await newInvite.save()

       const year = date.split("-")[0] ;
       
        



        const sendMessages = invites.map(async (el) => {
            try {

                const subject = `You’re Invited to the Alumni Reunion ${year}!`;
                const message = `<h2>Alumni Reunion Invitation</h2>
        
                            <p>Dear <i>${el.name}</i>,</p>
        
                            <p>We are thrilled to invite you to the <b>Alumni Reunion ${year}</b> hosted by <b>Alumni Next</b>. This special event will bring together alumni from all years for an unforgettable evening of reconnecting, reminiscing, and celebrating our shared memories at <b>Thakur College , Kandivali</b>.</p>
        
                            <p><b>Event Details:</b></p>
                            <ul>
                                <li><b>Event Name:</b> Alumni Reunion ${year}</li>
                                <li><b>Date:</b> ${date}</li>
                                <li><b>Time:</b>${time}</li>
                                <li><b>Location:</b>${location}</li>
                            </ul>
        
                            <p><b>Why Attend?</b></p>
                            <ul>
                                <li>Reconnect with old friends and classmates</li>
                                <li>Share experiences and memories</li>
                                <li>Network with alumni from various industries</li>
                                <li>Hear from distinguished speakers and faculty</li>
                            </ul>
        
                            <p>We would love to see you there and relive the moments that shaped our lives.</p>
        
                            <p>For any questions, feel free to reach out to us at <i>alumninext081@gmail.com</i>.</p>
        
                            <p>We can’t wait to see you and make new memories together!</p>
        
                            <p>Warm regards,</p>
                            <p><b>Admin, Alumni Next</b></p>
                        `;
                // Send email
                await sendMail(el.email, subject, message);

                // Send SMS via Twilio
                const res = await client.messages.create({
                    from: process.env.TWILIO_PHONE_NUMBER,
                    to: el.phoneNumber, 
                    body: `\n\nHi ${el.name},\n\nExciting news! You’re invited to the Alumni Reunion ${year} by Alumni Next!\n\n📅 Date: ${date}\n⏰ Time: ${time}\n📍 Location: ${location} \n\nJoin us to reconnect, reminisce, and network with fellow alumni.\n\nSee you there!\nAdmin, Alumni Next`
                });

                // console.log(res);
                
            } catch (error) {
                console.error(`Error sending to ${el.phoneNumber}:`, error);
            }
        });

        await Promise.all(sendMessages);

        res.status(200).json({
            success: true,
            message: 'Invitations sent successfully',
            newInvite
        });

    } catch (error) {
        console.log('Error:', error);
        res.status(500).json('Error sending invitations');
    }
}


export {registerNewAlumni,getAllAlumni,getAlumniByDegreeAndSpecialization,sendInvite}