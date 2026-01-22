import React from 'react'
import Footer from "../../components/Footer.jsx"
import Navbar from "../../components/Navbar.jsx"
import "../../style/profilePage.css"
import UserProfileCard from '../../components/UserProfileCard.jsx'

const UserProfile = () => {
  return (
    <div className='mainSection'>
        <Navbar PageName="Profile" />
          <UserProfileCard />
        <Footer />
    </div>
  )
}

export default UserProfile 
