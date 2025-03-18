import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/authContext";

const AdminRoute: React.FC = () => {
  const { user } = useAuth(); // Get the logged-in user from the auth context

  // Check if the user is logged in and has the "admin" role
  if (!user) {
    return <Navigate to="/login" replace />; // Redirect to login if not logged in
  }

  if (user.user_role !== "admin") {
    return <Navigate to="/" replace />; // Redirect to home if not an admin
  }

  return <Outlet />; // Render the child routes if the user is an admin
};

export default AdminRoute;
