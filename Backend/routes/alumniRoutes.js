import {Router} from 'express'
import { getAllAlumni, registerNewAlumni } from '../controllers/alumniController.js'
import {  authorizedRoles, isLoggedIn } from '../middlewares/authMiddleware.js'
import upload from '../middlewares/multerMiddleware.js'
import { donate, getAllDonationList } from '../controllers/donationController.js'

const router = Router()

router.post('/add-alumni',isLoggedIn,authorizedRoles('ADMIN'),registerNewAlumni)
router.get('/',isLoggedIn,authorizedRoles('ADMIN'),getAllAlumni)
router.post('/donate',isLoggedIn,authorizedRoles('ALUMNI'),upload.single('screenShot'),donate)
router.get('/get-all-donations',isLoggedIn,authorizedRoles('ADMIN'),getAllDonationList)

export default router