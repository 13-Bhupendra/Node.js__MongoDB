import React from 'react'
import {Routes , Route } from "react-router-dom"
import Home from "../pages/Home"
import Movies from "../pages/Movies"
import Dashboard from '../pages/Dashboard'
import Profile from '../pages/Profile'

const AllRoutes = () => {
  return (
    <div>
        <Routes >
            <Route path='/' element={<Home />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/profile' element={<Profile />} />
         </Routes>
    </div>
  )
}

export default AllRoutes
