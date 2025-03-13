import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAuth } from "../auth/authContext"; // Import the authentication context

function AppHeader() {
  const { user } = useAuth(); // Get the user from the authentication context

  return (
    <Navbar
      collapseOnSelect
      expand="sm" // controls when the navbar collapses. e.g. "sm", "md", "lg", "xl"
      className="bg-body-tertiary"
      bg="light"
      data-bs-theme="light"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          Project-X
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/portfolio">
              Our Work
            </Nav.Link>
            <Nav.Link as={Link} to="/pricing">
              Pricing
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>
            {user ? (
              <Nav.Link as={Link} to="/profile">
                Logged in as: {user.email.split("@")[0]}
              </Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Log In
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppHeader;
