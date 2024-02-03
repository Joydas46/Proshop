import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AdminRoute = () => {
    const {userInfo} = useSelector((state) => state.auth)
    // The Outlet component is used to render the child route in the parent route if the user is logged in
    // else we will be redirected to the login page
    return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/login" replace/>
}

export default AdminRoute