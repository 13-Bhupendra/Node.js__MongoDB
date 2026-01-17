import React from "react";
import LOGO from "../assets/images/logo.png";
import "../style/footer.css";

const Footer = () => {
  return (
      <footer className="footer py-4 mt-5">
        <div className="container ">
            <div className="upperContent d-flex justify-content-between">
                <section className="d-flex">
                  <img src={LOGO} alt="logo" className="footerLogo mb-3" />

            <section>
                <h6 className="footerTitle mb-1 ">e-Cyber Crime Portal</h6>
          <p className="footerSubtitle mb-2">
            Digital Cyber Crime Complaint Management System
          </p>
            </section>
            </section>

            <span>Privacy Policy</span>
            <span>Terms of Use</span>
            <span>Disclaimer</span>
            </div>

            <hr style={{color:"grey"}}/>

          <p className="footerHelpline mb-1 text-center">Helpline: 1800-XXX-XXXX</p>
          <p className="footerCopyright mb-0 ">
            © 2026 Ministry of Home Affairs, Government of India. All rights
            reserved.
          </p>
        </div>
      </footer>
  );
};

export default Footer;
