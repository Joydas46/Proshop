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

const router = express.Router()

// Only admin can access these
router.route('/').post(registerUser).get(getUsers)
// Since we have only post request, we can use post
router.post('/login', authUser)
router.post('/logout', logoutUser)

router.route('/profile').get(getUserProfile).put(updateUserProfile)
// Only admin can access these
router.route('/:id').get(getUserById).delete(deleteUser).put(updateUser)


export default router