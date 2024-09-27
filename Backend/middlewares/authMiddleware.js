import jwt from 'jsonwebtoken'
import {config} from 'dotenv'
config()

async function isLoggedIn(req,res,next){
    try {
        const {token} = req.cookies

        if(!token){
            res.status(500).json('Unauthenticated user !')
        }

        const userDetails = jwt.verify(token,process.env.SECRET)

        req.user = userDetails

        next()

    } catch (error) {
        console.log(error);
    }
}


const  authorizedRoles = (...roles) => async (req,res,next) =>{
    // console.log(req.user.role);
    
    const currentRole = req.user.role

    if(!roles.includes(currentRole)){
        return res.status(500).json('You cannot access this route !')
    }

    next()
}

export {authorizedRoles,isLoggedIn}