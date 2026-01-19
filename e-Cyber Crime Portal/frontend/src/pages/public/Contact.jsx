import React from "react"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane
} from "react-icons/fa"
import "../../style/contact.css"

const Contact = () => {
  return (
    <div className="mainSection ">
      <Navbar PageName="Contact Us" />

      <div className="container contactPage mb-5 p-5">

        <h2 className="pageTitle">Contact Us</h2>
        <p className="pageSub">
          Have questions? Reach out to our support team.
        </p>

        <div className="row mt-4 g-4">

          <div className="col-lg-4">

            <div className="contactInfoBox">
              <div className="infoCard">
                <FaPhoneAlt />
                <div>
                  <h6>Helpline</h6>
                  <p>1800-XXX-XXXX</p>
                  <span>24/7 Available</span>
                </div>
              </div>

              <div className="infoCard">
                <FaEnvelope />
                <div>
                  <h6>Email</h6>
                  <p>support@ecybercrime.gov</p>
                </div>
              </div>

              <div className="infoCard">
                <FaMapMarkerAlt />
                <div>
                  <h6>Address</h6>
                  <p>
                    Cyber Crime Investigation Cell <br />
                    New Delhi - 110001
                  </p>
                </div>
              </div>

              <div className="infoCard">
                <FaClock />
                <div>
                  <h6>Office Hours</h6>
                  <p>Mon - Fri : 9AM - 6PM</p>
                  <span>Sat : 9AM - 2PM</span>
                </div>
              </div>
            </div>

          </div>

          <div className="col-lg-8">

            <div className="signUpFormContainer contactFormBox" style={{width:"100%"}}>

              <div className="formHeader p-3">
                <h4 style={{ color: "lightcyan" }}>
                  Send a Message
                </h4>
              </div>

              <div className="form mt-4">

                <div className="row g-3">
                  <div className="col-md-6">
                    <label>Full Name</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="col-md-6">
                    <label>Email</label>
                    <input
                      type="email"
                      className="input"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label>Subject</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="How can we help?"
                  />
                </div>

                <div className="mt-4">
                  <label>Message</label>
                  <textarea
                    className="input textarea"
                    placeholder="Describe your query..."
                  />
                </div>

                <button className="registerBtn mt-4">
                  <FaPaperPlane /> &nbsp; Send Message
                </button>

              </div>

            </div>

          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Contact
