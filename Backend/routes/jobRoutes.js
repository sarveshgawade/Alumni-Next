import {Router} from 'express'
import {  authorizedRoles, isLoggedIn } from '../middlewares/authMiddleware.js'
import upload from '../middlewares/multerMiddleware.js'
import { addNewJob, deleteJob, getAllJobsList } from '../controllers/jobController.js'

const router = Router()

// routes
router.post('/add',isLoggedIn,authorizedRoles('ADMIN','ALUMNI'),upload.single('thumbnail'),addNewJob)
router.get('/',isLoggedIn,getAllJobsList)
router.delete('/:id',isLoggedIn,authorizedRoles('ADMIN'),deleteJob)

export default router