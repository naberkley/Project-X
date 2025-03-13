import React from "react";

const ProtectedComponent: React.FC = () => {
  return (
    <div>
      <h1>Protected Page</h1>
      <p>This page is only accessible to logged-in users.</p>
    </div>
  );
};

export default ProtectedComponent;
