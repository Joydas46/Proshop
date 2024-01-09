import express from 'express'
import asyncHandler from '../middleware/asyncHandler.js'
import Products from '../models/productModel.js'

const router = express.Router()

// Implementing a get request to the route api/products which will be loaded in the main screen
// or the HomeScreen
// asyncHandler is used to call the mongoose methods because mongoose methods return a promise
router.get('/', asyncHandler(async (req, res) => {
    const products = await Products.find({})
    res.json(products)
}))

// Implementing a get request to the route api/products/:id which will be loaded in the ProductScreen
router.get('/:id', asyncHandler(async (req, res) => {
    const product = await Products.findById(req.params.id)
    // if product is found, render it else send a 404
    if(product){
        return res.json(product)
    }
    res.status(404).json({message: 'Product not found'})
}))


export default router