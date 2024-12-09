/** @format */

import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

/* eslint-disable react/prop-types */

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (currentUser) {
    return children;
  }

  return <Navigate to='/login' replace />;
};

export default PrivateRoute;
