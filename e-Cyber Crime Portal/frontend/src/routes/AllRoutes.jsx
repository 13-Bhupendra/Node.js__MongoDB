import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/public/Home.jsx'
import Otp_Verification from '../pages/public/Otp_Verification.jsx'
import Page404 from '../components/Page404.jsx'
import About from '../pages/public/About.jsx'
import Contact from '../pages/public/Contact.jsx'
import Signup from '../pages/public/Signup.jsx'
import Signin from '../pages/public/Signin.jsx'

const AllRoutes = () => {
  return (
    <div>
      <Routes>

        {/*Common Routes */}
        <Route path="/" element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />

        {/*Auth Routes */}
        <Route path='/auth/signup' element={<Signup />} />
        <Route path='/auth/signin' element={<Signin />} />
        <Route path='/auth/otp/verify' element={<Otp_Verification />} />

        <Route path='*' element={<Page404 />} />
      </Routes>
    </div>
  )
}

export default AllRoutes
