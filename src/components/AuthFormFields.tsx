import React from "react";

interface AuthFormFieldsProps {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}

const AuthFormFields: React.FC<AuthFormFieldsProps> = ({
  email,
  password,
  setEmail,
  setPassword,
}) => {
  return (
    <>
      <div>
        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
      </div>
    </>
  );
};

export default AuthFormFields;
