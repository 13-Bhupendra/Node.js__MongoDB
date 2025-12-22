import React from 'react'
import {Routes , Route } from "react-router-dom"
import Home from "../pages/Home"
import Movies from "../pages/Movies"
import Dashboard from '../pages/Dashboard'
import Profile from '../pages/Profile'
import Description from '../pages/Description'
import AddMovie from '../pages/AddMovie'
import EditMovieForm from '../components/EditMovieForm'

const AllRoutes = () => {
  return (
    <div>
        <Routes >
            <Route path='/' element={<Home />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/movieDescription/:id' element={<Description />} />
            <Route path='/addMovie' element={<AddMovie />} />
            <Route path='/editMovie/:id' element={<EditMovieForm />} />
         </Routes>
    </div>
  )
}

export default AllRoutes
