import cloudinary from 'cloudinary'
import fs from 'fs/promises'
import ImageUpload from '../models/imageUploadModel.js'

const uploadImages = async (req,res) => {
    try {
        // console.log(req.files);
        
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No images were uploaded" });
          }

          const images = await Promise.all(req.files.map( (file) => {
            return file;
            
          }));
        
          const imgPath = images.map(el => el.path)

        //   console.log(imgPath);
          try {
                const result = await Promise.all(
                    imgPath.map(el => 
                        cloudinary.v2.uploader.upload(el,{
                        folder: 'lms'
                    })
                ))

                console.log(result);
                

                const cloudinaryImages = result.map((image) => ({
                    public_id: image.public_id,
                    secure_url: image.secure_url,
                  }));

                  const savedImages = await ImageUpload.create({
                    images: cloudinaryImages,
                  });

                  console.log(savedImages);

                  res.status(200).json({
                    message: "Images uploaded and saved successfully",
                    images: savedImages.images
                  });
                  
                
                
            
          } catch (error) { 
            console.log(error);
            
          }

          

          
          
    } catch (error) {
        console.log(error);
        
    }
}

export {uploadImages}
