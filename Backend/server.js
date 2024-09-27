import app from './app.js'
import { configDotenv } from 'dotenv';
import cloudinary from 'cloudinary'
configDotenv()

const PORT = process.env.PORT || 3020

// cloudnary configuration
cloudinary.v2.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

// server listens here !
app.listen(PORT, ()=>{
    console.log(`server running on port :${PORT}`);
    
})