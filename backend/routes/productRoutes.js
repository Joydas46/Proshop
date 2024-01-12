import express from 'express'
import { getProducts, getProductById } from '../controllers/productControllers.js'

// Express helps us to create routes using the Router method
const router = express.Router()

// Calling the getProducts controller function
router.route('/').get(getProducts)

// Calling the getProductById controller function
router.route('/:id').get(getProductById)


export default router