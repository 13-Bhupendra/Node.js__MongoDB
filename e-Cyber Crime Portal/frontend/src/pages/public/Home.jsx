import React from 'react'
import Navbar from "../../components/Navbar.jsx"
import Footer from '../../components/Footer.jsx'
import HomeHeroSection from '../../components/HomeHeroSection.jsx'
import '../../style/home.css'

const Home = () => {
  return (
    <div className='mainSection'>
        <Navbar PageName="Home"/>
        <HomeHeroSection />
        <Footer />
    </div>
  )
}

export default Home
