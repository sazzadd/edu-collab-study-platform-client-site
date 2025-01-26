import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../component/Loading";
import useRole from "../hook/useRole";
import { AuthContext } from "../provider/AuthProvider";

const AdminRoute = ({ children }) => {
  const [userData, userLoading] = useRole();
  const location = useLocation();
  const { loading, logOut } = useContext(AuthContext);
  if (loading || userLoading) {
    return <Loading></Loading>;
  }
  if (userData.role !== "admin") {
    logOut();
    return <Navigate to="/auth/login"></Navigate>;
  }
  return children;
};

export default AdminRoute;
