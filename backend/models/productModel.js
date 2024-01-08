import mongoose from "mongoose"

// review schema
const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


// product schema/ model
const productSchema = new mongoose.Schema({
    user: {
        // referencing the user model, where id is stored whenever any new product is created
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // Added this field to know which user created the product
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    // to add createdAt and updatedAt fields to the schema, added timestamps: true
    timestamps: true
})

// Creating a product model from the schema
const Product = mongoose.model('Product', productSchema)

export default Product