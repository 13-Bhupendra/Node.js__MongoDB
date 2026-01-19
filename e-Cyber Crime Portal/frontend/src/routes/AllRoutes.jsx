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
import CaseDetail from "../pages/investigator/CaseDetail.jsx"
import InvestigatorDashboard from "../pages/investigator/InvestigatorDashboard.jsx"
import AdminLayout from "../pages/admin/AdminLayout.jsx"
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import ManageUsers from "../pages/admin/ManageUsers.jsx";
import ManageInvestigators from "../pages/admin/ManageInvestigators.jsx"
import ResetForgetPassword from "../pages/public/ResetForgetPassword.jsx";

const AllRoutes = () => {
  const [role, setRole] = useState(undefined);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) setRole(storedRole);
    else setRole(null);
  }, []);

  if (role === undefined) return null;

  return (
    <div>
      <Routes>
        {/*Common Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/*Auth Routes */}
      {role === null &&   (<>
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/auth/signin" element={<Signin />} />
            <Route path="/auth/otp/verify" element={<Otp_Verification />} />
            <Route path="/auth/reset/forget/password" element={<ResetForgetPassword />} />
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
          <Route path="profile" element={<UserProfile />} />
        </Route>

          {/* INVESTIGATOR */}
          <Route path="/investigator/*" element={role === "investigator" ? <InvestigatorLayout /> : <Navigate to="/auth/signin" />} >
            <Route path="assigned/complaints" element={<AssignedComplaints />} />
            <Route path="case/detail" element={<CaseDetail />} />
            <Route path="dashboard" element={<InvestigatorDashboard />} />
          </Route>

          {/* ADMIN */}
          <Route path="/admin/*" element={role === "admin" ? <AdminLayout /> : <Navigate to="/auth/signin"/>} >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="manage/users" element={<ManageUsers />} />
            <Route path="manage/investigators" element={<ManageInvestigators />} />

          </Route>


        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
