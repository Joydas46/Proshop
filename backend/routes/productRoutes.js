import express from 'express'
import { getProducts, getProductById, createProduct } from '../controllers/productController.js'
import { protect, admin} from '../middleware/authMiddleware.js'

// Express helps us to create routes using the Router method
const router = express.Router()

// Calling the getProducts controller function
router.route('/').get(getProducts).post(protect, admin, createProduct)

// Calling the getProductById controller function
router.route('/:id').get(getProductById)


export default router