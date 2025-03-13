import React from "react";
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
      <p>Subscription: {user.subscriptionTier}</p>
      <p>Payment Method: {user.paymentInfo}</p>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p> {/* Change this later, not secure */}
      <button onClick={logout}>Log Out</button>
    </div>
  );
};

export default UserProfile;
