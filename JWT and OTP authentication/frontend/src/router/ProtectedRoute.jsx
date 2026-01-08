import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const hasToken = document.cookie.includes("token=");
  return hasToken ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
