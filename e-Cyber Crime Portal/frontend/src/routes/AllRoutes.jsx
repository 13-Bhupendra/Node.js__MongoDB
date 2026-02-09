import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/public/Home.jsx";
import Otp_Verification from "../pages/public/Otp_Verification.jsx";
import Page404 from "../components/Page404.jsx";
import About from "../pages/public/About.jsx";
import Contact from "../pages/public/Contact.jsx";
import Signup from "../pages/public/Signup.jsx";
import Signin from "../pages/public/Signin.jsx";
import UserLayout from "../pages/user/UserLayout.jsx";
import UserDashboard from "../pages/user/UserDashboard.jsx";
import FileComplaint from "../pages/user/FileComplaint.jsx";
import MyComplaint from "../pages/user/MyComplaint.jsx";
import UserProfile from "../pages/user/UserProfile.jsx";
import InvestigatorLayout from "../pages/investigator/InvestigatorLayout.jsx"
import AssignedComplaints from "../pages/investigator/AssignedComplaints.jsx"
import InvestigatorDashboard from "../pages/investigator/InvestigatorDashboard.jsx"
import AdminLayout from "../pages/admin/AdminLayout.jsx"
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import ManageUsers from "../pages/admin/ManageUsers.jsx";
import ManageInvestigators from "../pages/admin/ManageInvestigators.jsx"
import ResetForgetPassword from "../pages/public/ResetForgetPassword.jsx";
import AdminProfile from "../pages/admin/AdminProfile.jsx";
import InvestigatorProfile from "../pages/investigator/InvestigatorProfile.jsx";
import axios from "axios";
import OtpVerify_CreatePassword from "../pages/public/OtpVerify_CreatePassword.jsx";
import ChangePassword from "../pages/public/ChangePassword.jsx";
import UserComplaintDetails from "../pages/user/UserComplaintDetails.jsx"
import ManageComplaints from "../pages/admin/ManageComplaints.jsx";
import AdminComplaintDetails from "../pages/admin/AdminComplaintDetails.jsx";
import AddMember from "../pages/admin/AddMember.jsx";
import InvestigatorComplaintDetails from "../pages/investigator/InvestigatorComplaintDetails.jsx";

const AllRoutes = () => {
  const [role, setRole] = useState(undefined);
  const BASE_URL = import.meta.env.VITE_BACKEND_SERVER_URL;

  //Get current user
  const getUser = async ()=>{
    try {
        const res = await axios.get(`${BASE_URL}/api/me` ,  { withCredentials: true });
        setRole(res.data.user.role)
    } catch (error) {
        setRole(null)
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  if (role === undefined) return null;

  return (
    <div>
      <Routes>
        {/*Common Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth/changePassword" element={<ChangePassword />} />


        {/*Auth Routes */}
      {role === null &&   (<>
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/auth/signin" element={<Signin />} />
            <Route path="/auth/otp/verify" element={<Otp_Verification />} />
            <Route path="/auth/reset/forget/password" element={<ResetForgetPassword />} />
            <Route path="/auth/otp/verify/create/newPassword" element={<OtpVerify_CreatePassword />} />
          </> )}

        {/* USER */}
        <Route
          path="/user/*"
          element={
            role === "user" ? <UserLayout /> : <Navigate to="/auth/signin" />
          }
        >
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="file/complaint" element={<FileComplaint />} />
          <Route path="complaints" element={<MyComplaint />} />
          <Route path="complaint/detail/:id" element={<UserComplaintDetails />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>

          {/* INVESTIGATOR */}
          <Route path="/investigator/*" element={role === "investigator" ? <InvestigatorLayout /> : <Navigate to="/auth/signin" />} >
            <Route path="assigned/complaints" element={<AssignedComplaints />} />
            <Route path="complaint/details/:id" element={<InvestigatorComplaintDetails />} />
            <Route path="dashboard" element={<InvestigatorDashboard />} />
            <Route path="profile" element={<InvestigatorProfile />} />
          </Route>

          {/* ADMIN */}
          <Route path="/admin/*" element={role === "admin" ? <AdminLayout /> : <Navigate to="/auth/signin"/>} >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="manage/users" element={<ManageUsers />} />
            <Route path="manage/investigators" element={<ManageInvestigators />} />
            <Route path="manage/complaints" element={<ManageComplaints />} />
            <Route path="complaint/detail/:id" element={<AdminComplaintDetails />} />
            <Route path="add/newMember" element={<AddMember />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>


        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
