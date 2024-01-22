import jwt from 'jsonwebtoken'
import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/userModel.js'

// @desc    Protect routes
const protect = asyncHandler(async (req, res, next) => {
    let token
    // Read the JWT from the cookie
    token = req.cookies.jwt

    if (token) {
        try {
            // Verify the JWTand decoding the token from the cookie
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // Get the user details except the password from the token and assign it to req.user so that later 
            // we can access the user details in the other routes by just doing req.user 
            req.user = await User.findById(decoded.userId).select('-password')
            next()
        } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    } else {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

// @desc    Admin only
const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
}

export { protect, admin }