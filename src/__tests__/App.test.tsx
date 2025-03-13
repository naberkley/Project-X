import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import { AuthProvider } from "../auth/authContext";

test("renders Home link", () => {
  render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
  const homeLink = screen.getByText(/home/i);
  expect(homeLink).toBeInTheDocument();
});

test("renders Hero component", () => {
  render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
  const carousel = screen.getByRole("region", { name: /carousel/i });
  expect(carousel).toBeInTheDocument();
});

test("renders Hero component with navigation buttons", () => {
  render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
  const prevButton = screen.getByLabelText(/Previous/i);
  const nextButton = screen.getByLabelText(/Next/i);
  expect(prevButton).toBeInTheDocument();
  expect(nextButton).toBeInTheDocument();
});
