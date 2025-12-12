import React from 'react'
import "../style/heroSection.css"
import { BiMoviePlay } from "react-icons/bi";
import { NavLink } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className='heroSectionContainer d-flex justify-content-center align-items-center text-center'>

        <div className="heroSectionContent container">

            <div className="logoText">

                <BiMoviePlay className="iconSize mb-3" />

                <h1 className="fw-bold headingSize">
                    Cine<span style={{color:"#d2ff27"}}>Cloud</span>
                </h1>

                <p className="mt-2 paraSize px-2 px-md-5">
                    Manage your movies effortlessly with a modern, powerful dashboard. <br />
                    Upload, organize, and track every film in one smart place.
                </p>
            </div>

            <div className="GetStartBtn mt-5">
                <NavLink to="/profile" >
                    <button>Get Started</button>
                </NavLink>
            </div>

        </div>

    </div>
  )
}

export default HeroSection
