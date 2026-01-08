import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUpPage from "../components/SignUpPage";
import SignInPage from "../components/SignInPage";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../components/Home";
import OtpVerificaiton from "../components/OtpVerificaiton";

const AllRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/otp/verification" element={<OtpVerificaiton />} />
        
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default AllRouter;
