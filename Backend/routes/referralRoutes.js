import {Router} from 'express'
import { addJobPost, deleteJobPost, getAllReferrals } from '../controllers/referralController.js'
import {  authorizedRoles, isLoggedIn } from '../middlewares/authMiddleware.js'
import upload from '../middlewares/multerMiddleware.js'


const router = Router()

router.post('/add-job-post',isLoggedIn,authorizedRoles('ALUMNI'),addJobPost)
router.get('/',isLoggedIn,authorizedRoles('ALUMNI'),getAllReferrals)
router.delete('/:id',isLoggedIn,authorizedRoles('ALUMNI'),deleteJobPost)


export default router