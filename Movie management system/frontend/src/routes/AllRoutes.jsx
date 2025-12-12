import React from 'react'
import {Routes , Route } from "react-router-dom"
import Home from "../pages/Home"
import Movies from "../pages/Movies"
import Dashboard from '../pages/Dashboard'
import Profile from '../pages/Profile'
import Description from '../pages/Description'

const AllRoutes = () => {
  return (
    <div>
        <Routes >
            <Route path='/' element={<Home />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/movieDescription' element={<Description />} />
         </Routes>
    </div>
  )
}

export default AllRoutes
