import React from 'react'
import { MdOutlineShield } from "react-icons/md";
import { IoMdArrowRoundForward } from "react-icons/io";

const HomeHeroSection = () => {
  return (
    <div className='container HeroSection p-5 '> 
        <div className="tagLine d-flex justify-content-center align-items-center p-2">
            <div className="logoIcon d-flex justify-content-center align-items-center pe-2">
                <MdOutlineShield  style={{color:" var(--fontColor)"}}/>
            </div>
            <span>Official Government Portal</span>
        </div>

        <section className='mt-4'>
                <h1>National Cyber Crime <br /> Reporting Portal</h1>
                <p>File and track cyber crime complaints online. A secure, transparent system for <br /> reporting 
                    digital crimes with encrypted evidence submission and real-time case <br /> monitoring.</p>
        </section>

        <div className="heroSectionButtons mt-5">
                <button className='heroSectionBtn1 p-2 me-3'>File a Complaint  <IoMdArrowRoundForward /> </button>
                <button className='heroSectionBtn2 p-2 mt-2'>Track Status</button>
        </div>
    </div>
  )
}

export default HomeHeroSection
