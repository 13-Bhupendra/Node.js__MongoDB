import React from "react";
import Navbar from "../../components/Navbar.jsx";
import {
  MdOutlineShield,
  MdOutlinePrivacyTip
} from "react-icons/md"
import { BsShieldCheck, BsClipboardData } from "react-icons/bs"
import { FaBalanceScale, FaUsers } from "react-icons/fa"
import "../../style/about.css"
import Footer from "../../components/Footer.jsx";

const About = () => {
  return (
    <div className="mainSection">
      <Navbar PageName="About" />

      <div className="container aboutPage">
        <div className="aboutHero p-5 mt-4">
          <div className="tagLine mb-3 d-flex align-items-center gap-2">
            <MdOutlineShield />
            <span>Government of India Initiative</span>
          </div>

          <h1>About e-Cyber Crime Portal</h1>

          <p>
            A digital initiative providing citizens with a secure, transparent
            platform for reporting cyber crimes and tracking complaint
            resolution.
          </p>
        </div>

        <div className="row missionSection mt-5 align-items-center">
          <div className="col-lg-6 mb-4">
            <span className="miniTitle">Our Mission</span>
            <h2>Making India Cyber Safe</h2>

            <p>
              The e-Cyber Crime Portal is established under the Digital India
              initiative to create a unified platform where citizens can report
              cyber crimes and track progress transparently.
            </p>
          </div>

          <div className="col-lg-6">
            <div className="row g-4">
              <div className="col-6">
                <div className="statBox">
                  <h3>50K+</h3>
                  <span>Complaints Resolved</span>
                </div>
              </div>

              <div className="col-6">
                <div className="statBox">
                  <h3>28</h3>
                  <span>States Covered</span>
                </div>
              </div>

              <div className="col-6">
                <div className="statBox">
                  <h3>92%</h3>
                  <span>Resolution Rate</span>
                </div>
              </div>

              <div className="col-6">
                <div className="statBox">
                  <h3>24/7</h3>
                  <span>Support Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="coreValuesSection mt-5 p-5">
          <h2 className="sectionTitle mb-4">Core Values</h2>

          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="valueCard">
                <BsShieldCheck />
                <h5>Security First</h5>
                <p>Enterprise-grade encryption and strict access controls.</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="valueCard">
                <BsClipboardData />
                <h5>Transparency</h5>
                <p>Clear communication at every stage of the process.</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="valueCard">
                <FaUsers />
                <h5>Citizen-Centric</h5>
                <p>Designed to make reporting accessible and simple.</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="valueCard">
                <FaBalanceScale />
                <h5>Justice</h5>
                <p>Every complaint is investigated thoroughly.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="securityNote mt-5 mb-5">
          <MdOutlinePrivacyTip />
          <p>
            All complaints are protected using end-to-end encryption. Data is
            accessed only by authorized cyber crime officials.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
