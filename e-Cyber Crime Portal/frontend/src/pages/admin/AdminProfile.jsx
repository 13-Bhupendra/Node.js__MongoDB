import React from 'react'
import Footer from '../../components/Footer.jsx'
import Navbar from '../../components/Navbar.jsx'
import AdminProfileCard from '../../components/AdminProfileCard.jsx'


const AdminProfile = () => {
  return (
  <div className='mainSection'>
        <Navbar PageName="Profile" />
        <AdminProfileCard />
        <Footer />
    </div>
  )
}

export default AdminProfile
