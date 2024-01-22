import express from 'express'
import { 
    authUser, 
    registerUser, 
    logoutUser, 
    getUserProfile, 
    updateUserProfile, 
    getUsers, 
    getUserById, 
    deleteUser, 
    updateUser } from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

// Only admin can access these
router.route('/').post(registerUser).get(protect, admin, getUsers)
// Since we have only post request, we can use post
router.post('/login', authUser)
router.post('/logout', logoutUser)

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
// Only admin can access these
router.route('/:id').get(protect, admin, getUserById).delete(protect, admin, deleteUser).put(protect, admin, updateUser)

export default router