import {Router} from 'express'
import {  authorizedRoles, isLoggedIn } from '../middlewares/authMiddleware.js'
import upload from '../middlewares/multerMiddleware.js'
import { addNewJobApplication} from '../controllers/jobApplicationController.js'

const router = Router()

// routes
router.post('/apply',isLoggedIn,upload.single('resume'),addNewJobApplication)


export default router