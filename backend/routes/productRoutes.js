import express from 'express'
import { getProducts, getProductById } from '../controllers/productControllers.js'

const router = express.Router()

// Calling the getProducts controller function
router.route('/').get(getProducts)

// Calling the getProductById controller function
router.route('/:id').get(getProductById)


export default router