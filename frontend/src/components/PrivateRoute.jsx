// Creating a private route for the shipping page,so that we can access only if we are logged in
import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = () => {
    const {userInfo} = useSelector((state) => state.auth)
    // The Outlet component is used to render the child route in the parent route if the user is logged in
    // else we will be redirected to the login page
    return userInfo? <Outlet /> : <Navigate to="/login" replace/>
}

export default PrivateRoute