import asyncHandler from '../middleware/asyncHandler.js'
import Products from '../models/productModel.js'

// @desc    Fetch all products
// Implementing a get request to the route api/products which will be loaded in the main screen
// or the HomeScreen.
// asyncHandler is used to call the mongoose methods because mongoose methods return a promise
// @route   GET /api/products
// @access  Public

const getProducts = asyncHandler(async (req, res) => {
    const products = await Products.find({})
    res.json(products)
})

// @desc    Fetch a single product
// // Implementing a get request to the route api/products/:id which will be loaded in the ProductScreen
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Products.findById(req.params.id)
    // if product is found, render it else send a 404
    if (product) {
        res.json(product)
    } else {
        // this error will be handled by the errorMiddleware.js
        res.status(404)
        throw new Error('Resource not found')
    }
})

export { getProducts, getProductById }