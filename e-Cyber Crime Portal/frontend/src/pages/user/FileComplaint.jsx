import React from "react";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";
import { FaFileUpload, FaUser, FaUserFriends, FaVenusMars, FaHeading, FaAlignLeft, FaExclamationTriangle, FaCalendarAlt, FaClock, FaGlobe, FaDollarSign } from "react-icons/fa";
import "../../style/fileComplaint.css";

const crimeOptions = [
  "Fraud", "Hacking", "Phishing", "Cyber Bullying", "Identity Theft",
  "Online Scam", "Ransomware", "Data Breach", "Harassment", "Other"
];

const websiteOptions = [
  "Facebook", "Instagram", "WhatsApp" , "Twitter",  "LinkedIn" , "Other"
];

const FileComplaint = () => {
  return (
    <div className="mainSection">
      <Navbar PageName="File Complaint" />

      <div className="d-flex justify-content-center mt-4 mb-4">
        <div className="profileMainContentCard" style={{ width: "80%" }}>

          {/* Personal Info */}
          <div className="profileDetailsCard">
            <div className="personalHeader">
              <h5>Personal Details</h5>
              <p>Fill your personal information</p>
            </div>

            <div className="formRow">
              <div className="formIcon"><FaUser /></div>
              <div className="formContent">
                <label>Full Name</label>
                <input type="text" placeholder="Enter your full name" />
              </div>

              <div className="formIcon"><FaUserFriends /></div>
              <div className="formContent">
                <label>Father / Mother Name</label>
                <input type="text" placeholder="Parent's name" />
              </div>
            </div>

            <div className="formRow">
              <div className="formIcon"><FaVenusMars /></div>
              <div className="formContent">
                <label>Gender</label>
                <select>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Incident Details */}
          <div className="profileDetailsCard mt-4">
            <div className="personalHeader">
              <h5>Incident Details</h5>
              <p>Provide details of the incident</p>
            </div>

            <div className="formRow">
              <div className="formIcon"><FaHeading /></div>
              <div className="formContent">
                <label>Title</label>
                <input type="text" placeholder="Complaint title" />
              </div>

              <div className="formIcon"><FaAlignLeft /></div>
              <div className="formContent">
                <label>Description</label>
                <textarea placeholder="Describe the incident" rows="1" />
              </div>
            </div>

            <div className="formRow">
              <div className="formIcon"><FaExclamationTriangle /></div>
              <div className="formContent">
                <label>Crime Type</label>
                <select>
                  <option value="">Select Crime Type</option>
                  {crimeOptions.map((c, i) => <option key={i} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="formIcon"><FaGlobe /></div>
              <div className="formContent">
                <label>Website / App Name</label>
                <select>
                  <option value="">Select Website / App</option>
                  {websiteOptions.map((w, i) => <option key={i} value={w}>{w}</option>)}
                </select>
              </div>
            </div>

            <div className="formRow">
              <div className="formIcon"><FaCalendarAlt /></div>
              <div className="formContent">
                <label>Incident Date</label>
                <input type="date" />
              </div>

              <div className="formIcon"><FaClock /></div>
              <div className="formContent">
                <label>Incident Time</label>
                <input type="time" />
              </div>
            </div>

            <div className="formRow">
              <div className="formIcon"><FaDollarSign /></div>
              <div className="formContent">
                <label>Amount Lost</label>
                <input type="number" placeholder="Enter amount lost" />
              </div>
            </div>
          </div>

          {/* Evidence Upload */}
          <div className="profileDetailsCard mt-4">
            <div className="personalHeader">
              <h5>Evidence Upload</h5>
              <p>Attach files related to the complaint</p>
            </div>

            <div className="evidenceUploadBox d-flex flex-column align-items-center justify-content-center">
              <FaFileUpload size={40} color="#5dade2" />
              <p>Click to upload files</p>
              <p>JPG, PNG, PDF up to 10MB</p>
              <input type="file" className="evidenceInput" />
            </div>

            <p className="securityNote mt-3">Files are encrypted and stored securely.</p>

            <button className="updateBtn mt-3">Submit Complaint</button>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FileComplaint;
