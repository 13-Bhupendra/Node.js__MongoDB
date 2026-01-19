import React from "react"
import { MdOutlineShield } from "react-icons/md"
import { IoMdArrowRoundForward } from "react-icons/io"
import { PiNoteLight } from "react-icons/pi"
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5"
import { BsGraphUp } from "react-icons/bs"
import { BiCoinStack } from "react-icons/bi"
import { FaFileAlt, FaSearch, FaExclamationTriangle } from "react-icons/fa"
import { HiOutlineCash, HiOutlineMail, HiOutlineUserRemove } from "react-icons/hi"
import { MdOutlineBugReport, MdOutlinePrivacyTip } from "react-icons/md"
import { AiOutlineShop } from "react-icons/ai"
import { BsShieldCheck, BsClipboardData, BsCheckCircle } from "react-icons/bs"  

const HomeHeroSection = () => {
  return (
    <div className='container HeroSection p-0'> 
        <div className="heroContent  p-5 ">
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

        <div className="container-fluid aboutCasesContent mt-4 ps-3">
            <div className="row ">

                <div className="col-6 col-xl-3 d-flex justify-content-left align-items-center pt-3 pb-3">
                    <div className="caseIcon me-3 d-flex justify-content-center align-items-center">
                        <PiNoteLight />
                    </div>
                    <section>
                         <h5 className='m-0' style={{color:"lightcyan"}}>1,24,567</h5>
                         <span style={{color:"grey"}}>Cases Registered</span>
                    </section>
                </div>
 
                  <div className="col-6 col-xl-3   d-flex justify-content-left align-items-center pt-3 pb-3">
                    <div className="caseIcon me-3 d-flex justify-content-center align-items-center">
                        <IoCheckmarkDoneCircleOutline />
                    </div>
                    <section>
                         <h5 className='m-0' style={{color:"lightcyan"}}>98,234</h5>
                         <span style={{color:"grey"}}>Cases Resolve</span>
                    </section>
                </div>

                  <div className="col-6 col-xl-3 d-flex justify-content-left align-items-center pt-3 pb-3">
                    <div className="caseIcon me-3 d-flex justify-content-center align-items-center">
                        <BsGraphUp />
                    </div>
                    <section>
                         <h5 className='m-0' style={{color:"lightcyan"}}>12,456</h5>
                         <span style={{color:"grey"}}>Active Investigations</span>
                    </section>
                </div>

                  <div className="col-6 col-xl-3  d-flex justify-content-left align-items-center pt-3 pb-3">
                    <div className="caseIcon me-3 d-flex justify-content-center align-items-center">
                        <BiCoinStack />
                    </div>
                    <section>
                         <h5 className='m-0' style={{color:"lightcyan"}}>28</h5>
                         <span style={{color:"grey"}}>States Connected</span>
                    </section>
                </div>
            </div>
        </div>


          <div className="container servicesSection mt-5 p-5 ">
                <h2 className="sectionTitle fw-bold" style={{color : "lightcyan"}}>Services</h2>
                <p className="sectionSub">
                Core functionalities available through this portal
                </p>

                <div className="row mt-4 g-4">

                <div className="col-lg-6">
                    <div className="serviceBox d-flex justify-content-between align-items-center">
                    <div className="d-flex gap-3">
                        <div className="serviceIcon"><FaFileAlt /></div>
                        <div>
                        <h5>File Cyber Crime Complaint</h5>
                        <p>
                            Submit cyber crime complaints including fraud,
                            harassment and identity theft.
                        </p>
                        </div>
                    </div>
                    <IoMdArrowRoundForward className="arrowIcon" />
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="serviceBox d-flex justify-content-between align-items-center">
                    <div className="d-flex gap-3">
                        <div className="serviceIcon"><FaSearch /></div>
                        <div>
                        <h5>Track Complaint Status</h5>
                        <p>
                            Track progress of complaints with real-time updates.
                        </p>
                        </div>
                    </div>
                    <IoMdArrowRoundForward className="arrowIcon" />
                    </div>
                </div>

                </div>
          </div>

      <div className="container processSection mt-5 p-5">
        <h2 className="sectionTitle fw-bold mb-4" style={{color : "lightcyan"}}>Complaint Process</h2>

        <div className="processFlow mt-4">

          <div className="processCard">
            <span>STEP 01</span>
            <h6>Register & Login</h6>
            <p>Create secure account</p>
          </div>

          <IoMdArrowRoundForward className="flowArrow" />

          <div className="processCard">
            <span>STEP 02</span>
            <h6>File Complaint</h6>
            <p>Submit details & evidence</p>
          </div>

          <IoMdArrowRoundForward className="flowArrow" />

          <div className="processCard">
            <span>STEP 03</span>
            <h6>Verification</h6>
            <p>Reviewed by officials</p>
          </div>

          <IoMdArrowRoundForward className="flowArrow" />

          <div className="processCard">
            <span>STEP 04</span>
            <h6>Resolution</h6>
            <p>Case resolved</p>
          </div>

        </div>
      </div>

      {/* ================= NOTICE ================= */}
      <div className="container noticeSection mt-5 mb-5">
        <FaExclamationTriangle />
        <p>
          Filing a false complaint is punishable under IT Act 2000.
          All data is encrypted and monitored by authorized officers.
        </p>
      </div>

    </div>
  )
}

export default HomeHeroSection
