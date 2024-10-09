import {Router} from 'express'
import {  authorizedRoles, isLoggedIn } from '../middlewares/authMiddleware.js'
import upload from '../middlewares/multerMiddleware.js'
import { addNewEvent, deleteEvent, getAllEvents } from '../controllers/eventController.js'

const router = Router()

// routes
router.post(
    '/add',
    isLoggedIn,
    authorizedRoles('ADMIN'),
    upload.fields([
      { name: 'thumbnail', maxCount: 1 }, // single thumbnail image
      { name: 'images', maxCount: 10 },   // array of images (up to 10)
    ]),
    addNewEvent
  );

router.get('/',getAllEvents)
router.delete('/:id',isLoggedIn,authorizedRoles('ADMIN'),deleteEvent)


export default router