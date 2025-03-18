import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAuth } from "../auth/authContext"; // Import the authentication context
import "../assets/css/layout/Header.css";

// Component for navigation links
const NavigationLinks: React.FC = () => (
  <>
    <Nav.Link as={Link} to="/">
      Home
    </Nav.Link>
    <Nav.Link as={Link} to="/portfolio">
      Our Work
    </Nav.Link>
    <Nav.Link as={Link} to="/pricing">
      Pricing
    </Nav.Link>
  </>
);

// Component for user-specific links
const UserLinks: React.FC<{ user: any }> = ({ user }) => {
  if (user) {
    return (
      <>
        <Nav.Link as={Link} to="/profile">
          Logged in as: {user.email.split("@")[0]}
        </Nav.Link>
        {user.user_role === "admin" && (
          <Nav.Link as={Link} to="/admin">
            Admin
          </Nav.Link>
        )}
      </>
    );
  }

  return (
    <Nav.Link as={Link} to="/login">
      Log In
    </Nav.Link>
  );
};

const AppHeader: React.FC = () => {
  const { user } = useAuth(); // Get the user from the authentication context

  return (
    <Navbar
      collapseOnSelect
      expand="sm" // controls when the navbar collapses. e.g. "sm", "md", "lg", "xl"
      className="bg-body-tertiary"
      bg="light"
      data-bs-theme="light"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          Project-X
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavigationLinks />
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>
            <UserLinks user={user} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppHeader;
