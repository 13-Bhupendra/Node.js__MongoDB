import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuth = document.cookie.includes("isAuth=true");
  return isAuth ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
