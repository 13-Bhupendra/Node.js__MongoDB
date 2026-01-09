import React from 'react'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({children}) => {
    const isAuth = document.cookie.includes("isAuth=true")
    return isAuth ? <Navigate to="/" /> : children;
}

export default PublicRoute
