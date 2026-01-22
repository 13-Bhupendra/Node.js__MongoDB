import React from 'react'
import Navbar from '../../components/Navbar.jsx'
import Footer from '../../components/Footer.jsx'
import InvestigatorProfileCard from '../../components/InvestigatorProfileCard.jsx'

const InvestigatorProfile = () => {
  return (
  <div className='mainSection'>
        <Navbar PageName="Profile" />
            <InvestigatorProfileCard />
        <Footer />
    </div>
  )
}

export default InvestigatorProfile
