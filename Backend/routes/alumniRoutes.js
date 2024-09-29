import {Router} from 'express'
import { getAllAlumni, registerNewAlumni } from '../controllers/alumniController.js'
import {  authorizedRoles, isLoggedIn } from '../middlewares/authMiddleware.js'

const router = Router()

router.post('/add-alumni',isLoggedIn,authorizedRoles('ADMIN'),registerNewAlumni)
router.get('/',isLoggedIn,authorizedRoles('ADMIN'),getAllAlumni)

export default router