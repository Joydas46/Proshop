import mongoose from "mongoose"
import dotenv from "dotenv"
import colors from "colors"
import users from "./data/users.js"
import products from "./data/products.js"
import User from "./models/userModel.js"
import Product from "./models/productModel.js"
import Order from "./models/orderModel.js"
import connectDB from "./config/db.js"

// configuring the environment variables
dotenv.config()

// connecting to the MongoDB database
connectDB()

const importData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()
        // Inserting the users data in the DB
        const createdUsers = await User.insertMany(users)
        // Getting the admin user, as the admin only can add the products in the DB
        const adminUser = createdUsers[0]._id
        // Storing all the products info along with admin info in the sampleProducts array
        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser }
        })
        // Inserting the products in the DB, along with the admin user
        await Product.insertMany(sampleProducts)
        console.log("Data imported".green.inverse)
        process.exit()
    } catch (error) {
        console.log(`Error: ${error.message}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()
        console.log("Data destroyed".red.inverse)
        process.exit()
    } catch (error) {
        console.log(`Error: ${error.message}`.red.inverse)
        process.exit(1)
    }
}

if (process.argv[2] === "-d") {
    destroyData()
} else {
    importData()
}