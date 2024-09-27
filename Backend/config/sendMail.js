import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    secure: true ,
    host: 'smtp.gmail.com',
    port: 465,
    auth:{
        user: 'alumninext081@gmail.com',
        pass: 'qyuonitkxcizgsdm'
    }
})

function sendMail(to,sub,msg){
    transporter.sendMail({
        to: to,
        subject: sub ,
        html: msg
    })
}


export default sendMail
