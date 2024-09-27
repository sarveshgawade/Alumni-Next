import {Router} from 'express'
import {changePassword, check, getProfile, login, logout, register, updateUser} from '../controllers/userController.js'
import {  authorizedRoles, isLoggedIn } from '../middlewares/authMiddleware.js'
import upload from '../middlewares/multerMiddleware.js'

const router = Router()

router.post('/register',upload.single('avatar'),register)
router.post('/login',login)
router.get('/my-profile',isLoggedIn,getProfile)
router.get('/logout',isLoggedIn,logout)
router.post('/change-password',isLoggedIn,changePassword)
router.post('/update',isLoggedIn,upload.single('avatar'),updateUser)
router.post('/check',isLoggedIn,authorizedRoles('ADMIN'),check)

export default router
