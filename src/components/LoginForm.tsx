import React from "react";
import CustomAlert from "./Alert";
import { Link } from "react-router-dom";
import AuthFormFields from "./AuthFormFields";
import useAuthForm from "../hooks/useAuthForm";
import "../assets/css/components/login-form.css";

const Login: React.FC = () => {
  const {
    email,
    password,
    error,
    success,
    setEmail,
    setPassword,
    handleSubmit,
  } = useAuthForm("http://localhost:5000/api/login");

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
      <button type="submit">Login</button>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </form>
  );
};

export default Login;
