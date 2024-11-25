import {Router} from 'express'
import {  authorizedRoles, isLoggedIn } from '../middlewares/authMiddleware.js'
import { getPDF, uploadPDF} from '../controllers/pdfContoller.js'
import multer from 'multer' 


const storage = multer.memoryStorage()
const upload = multer({storage})

const router = Router()

// routes
router.post('/upload',isLoggedIn,authorizedRoles('ALUMNI'),upload.single('file'),uploadPDF)
router.get('/:id',getPDF)

export default router