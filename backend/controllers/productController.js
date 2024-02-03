import asyncHandler from '../middleware/asyncHandler.js'
import Product from '../models/productModel.js'

// @desc    Fetch all products
// Implementing a get request to the route api/products which will be loaded in the main screen
// or the HomeScreen.
// asyncHandler is used to call the mongoose methods because mongoose methods return a promise
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})

// @desc    Fetch a single product
// // Implementing a get request to the route api/products/:id which will be loaded in the ProductScreen
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    // if product is found, render it else send a 404
    if (product) {
        res.json(product)
    } else {
        // this error will be handled by the errorMiddleware.js
        res.status(404)
        throw new Error('Resource not found')
    }
})

// @desc    Create a Product
// @route   POST /api/products
// @access  Public
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample Name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

export { getProducts, getProductById, createProduct }