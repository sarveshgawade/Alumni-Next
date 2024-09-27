import mongoose, { model } from 'mongoose'
import bcrypt from 'bcrypt'
import jwtToken from 'jsonwebtoken'
import { config } from 'dotenv'
config()
// import crypto from 'crypto'


const userSchema = new mongoose.Schema({
    fullName:{
        type:'String',
        required: [true,`Name is a required field`] ,
        trim: true ,

    },
    email:{
        type:'String',
        required: [true,`Email is a required field`] ,
        trim: true ,
        unique: true ,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please fill in a valid email address'
          ] 

    },
    password:{
        type:'String',
        required: [true,`Password is a required field`] ,
        trim: true ,
        select : false   ,
        minLength : [6,`Password must be atleast of 6 characters`]  

    },
    avatar:{
        public_id :{ type: 'String'},
        secure_url :{ type: 'String'}
    },
    role:{
        type:'String',
        enum: ['USER','ADMIN','ALUMNI'],
        default: 'USER'
    },
    courseCompleted:{
        type:'String',
        // required: [true,`courseCompleted is a required field`] ,
        trim: true ,
    },
    passoutBatch:{
        type:'Number',
        // required: [true,`passoutBatch is a required field`] ,
        trim: true ,
    },
    currentCompanyWorkingIn:{
        type:'String',
        // required: [true,`currentCompanyWorkingIn is a required field`] ,
        trim: true ,
    },
    currentCompanyWorkinInRole:{
        type:'String',
        // required: [true,`currentCompanyWorkinInRole is a required field`] ,
        trim: true ,
    },
    phoneNumber:{
        type: 'String',
        required: [true,'phoneNumber is required ']
    }

},{
    timestamps:true
})

// ENCRYPTING PASSWORD
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next()
    }
    this.password = await bcrypt.hash(this.password,7)
})


// JWT TOKEN GENERATION
userSchema.methods = {
    generateJWTtoken: async function(){
        return await jwtToken.sign(
            {id:this._id, email: this.email, subscription: this.subscription, role: this.role, fullName: this.fullName},
            process.env.SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY
            }
        )
    },
    comparePassword: async function(plainTextPassword){
        return await bcrypt.compare(plainTextPassword,this.password)
    },

}

const user = model('User',userSchema)

export default user