import asyncHandler from '../middleware/asyncHandler.js'
import Product from '../models/productModel.js'

// @desc    Fetch all products
// Implementing a get request to the route api/products which will be loaded in the main screen
// or the HomeScreen.
// asyncHandler is used to call the mongoose methods because mongoose methods return a promise
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 1
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword ? {
        name : {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const count = await Product.countDocuments({...keyword})

    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1))
res.json({products, page, pages: Math.ceil(count / pageSize)})
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
// @access  Private/Admin
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

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body
    
    const product = await Product.findById(req.params.id)
    if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.status(200).json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id)
    if (product) {
        await Product.deleteOne({_id: product._id})
        res.status(200).json({message: 'Product deleted'})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
    const product = await Product.findById(req.params.id)
    if (product) {
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review)

        product.numReviews = product.reviews.length

        product.rating = product.reviews.reduce((acc, review) => review.rating + acc, 0) / product.reviews.length

        await product.save()

        res.status(201).json({ message: 'Review added' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }   
})

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct, createProductReview }