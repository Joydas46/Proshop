// This is our main server file for the backend, which will be used by the frontend.
// In the frontend it is using axios to make the function calls to the route api/products to fetch the data.
// using esmodules
import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import cookieParser from 'cookie-parser'

// configuring the environment variables
dotenv.config()

// connecting to the MongoDB database
connectDB()

const port = process.env.PORT || 5000
const app = express()

// Body parser middleware to get the body data
app.use(express.json())
app.use(urlencoded({ extended: true }))

// Cookie parser middleware
app.use(cookieParser())

// making a get request to the route directory to check if the server is running
app.get('/', (req, res) => {
    res.send('API is running...')
})

// Express helps us to have the routes stored in a separate js file, which makes the code look simple.
// BY doing this the server file looks simple and all the get requests to different routes are handled
// in a separate js file, which in this case is productRoutes.js
app.use('/api/products', productRoutes)
// Express helps us to have the routes stored in a separate js file, which makes the code look simple.
// BY doing this the server file looks simple and all the get requests to different routes are handled
// in a separate js file, which in this case is userRoutes.js
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req, res) => {
    res.send({clientId: process.env.PAYPAL_CLIENT_ID})
})

app.use(notFound)
app.use(errorHandler)
    
app.listen(port, () => console.log(`Server running on port ${port}`))