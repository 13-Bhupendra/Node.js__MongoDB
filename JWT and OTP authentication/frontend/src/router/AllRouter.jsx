import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUpPage from "../components/SignUpPage";
import SignInPage from "../components/SignInPage";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../components/Home";
import OtpVerificaiton from "../components/OtpVerificaiton";
import PublicRoute from "./publicRoute";

const AllRouter = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUpPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <SignInPage />
            </PublicRoute>
          }
        />
        <Route
          path="/otp/verification"
          element={
            <PublicRoute>
              <OtpVerificaiton />
            </PublicRoute>
          }
        />

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
