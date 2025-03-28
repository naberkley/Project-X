import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/authContext";

const PrivateRoute: React.FC = () => {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
