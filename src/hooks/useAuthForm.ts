import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";
import { validateEmail, validatePassword } from "../utils/ValidationUtils";
import { User } from "../auth/types";

const useAuthForm = (url: string) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to process request");
      }

      const userData: User = await response.json();
      login(userData);
      setSuccess("Operation successful! Redirecting to home...");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      if (err instanceof Error) {
        console.error("AuthForm Error:", err.message);
        setError(err.message);
      } else {
        console.error("Unexpected AuthForm error:", err);
        setError("An unexpected error occurred");
      }
    }
  };

  return {
    email,
    password,
    error,
    success,
    setEmail,
    setPassword,
    handleSubmit,
  };
};

export default useAuthForm;