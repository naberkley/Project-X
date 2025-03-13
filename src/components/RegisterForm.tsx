import React from "react";
import CustomAlert from "./Alert";
import { Link } from "react-router-dom";
import AuthFormFields from "./AuthFormFields";
import useAuthForm from "../hooks/useAuthForm";

const Register: React.FC = () => {
  const {
    email,
    password,
    error,
    success,
    setEmail,
    setPassword,
    handleSubmit,
  } = useAuthForm("http://localhost:5000/api/register");

  console.log("Error:", error);
  console.log("Success:", success);

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {error && <CustomAlert message={error} type="error" />}
      {success && <CustomAlert message={success} type="success" />}
      <AuthFormFields
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
      />
      <button type="submit">Register</button>
      <p>
        Already have an account? <Link to="/login">Log in here</Link>
      </p>
    </form>
  );
};

export default Register;
