// This is our main server file for the backend, which will be used by the frontend.
// In the frontend it is using axios to make the function calls to the route api/products to fetch the data.
// using esmodules
import express from 'express'
import dotenv from 'dotenv'
import productRoutes from './routes/productRoutes.js'
import connectDB from './config/db.js'

// configuring the environment variables
dotenv.config()

// connecting to the MongoDB database
connectDB()

const port = process.env.PORT || 5000
const app = express()

// making a get request to the route directory to check if the server is running
app.get('/', (req, res) => {
    res.send('API is running...')
})

// Express helps us to have the routes stored in a separate js file, which makes the code look simple.
// BY doing this the server file looks simple and all the get requests to different routes are handled
// in a separate js file, which in this case is productRoutes.js
app.use('/api/products', productRoutes)
    
app.listen(port, () => console.log(`Server running on port ${port}`))