import {Router} from 'express'
import {  authorizedRoles, isLoggedIn } from '../middlewares/authMiddleware.js'
import upload from '../middlewares/multerMiddleware.js'
import { uploadImages } from '../controllers/imageUploadController.js'

const router = Router()

// routes
router.post('/',upload.array('images',10),uploadImages)


export default router