import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    // Return an animated spinner
    return (
      <div className="flex justify-center items-center">
        <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (user && user?.displayName) {
    return children;
  }

  // Redirect to login page if not authenticated
  return (
    <Navigate to="/auth/login" state={{ from: location.pathname }} replace />
  );
};

export default PrivateRoute;
