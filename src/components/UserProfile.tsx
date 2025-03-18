import React from "react";
import CustomButton from "./Button";
import { useAuth } from "../auth/authContext";

const UserProfile: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <p>You need to log in to view this page.</p>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>User ID: {user.id}</p>
      <p>Subscription: {user.subscription_tier}</p>
      <p>Payment Method: {user.payment_info}</p>
      <p>Email: {user.email}</p>
      <CustomButton onClick={logout}>Log Out</CustomButton>
    </div>
  );
};

export default UserProfile;
