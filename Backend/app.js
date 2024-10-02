import express from 'express'
import connectToDB from './config/dbConnection.js'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import jobRoutes from './routes/jobRoutes.js'
import otpRoutes from './routes/otpRoutes.js'
import alumniRoutes from './routes/alumniRoutes.js'

// taking app instance
const app = express()



// database connection
connectToDB()



// middlewares
const corsOptions = {
    origin : "http://localhost:5173",
    credentials : true
}

app.use(express.json({limit:'10mb'}))
app.use(express.urlencoded({extended: true,limit:'10mb'}))
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(morgan('dev'))


// checking route
app.get('/ping',(req,res)=>{
    res.send("pong")
})


// api's
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/jobs',jobRoutes)
app.use('/api/v1/alumni',alumniRoutes)

// test for otp
app.use('/api/v1/otp',otpRoutes)

export default app