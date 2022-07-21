import LoginIcon from "@mui/icons-material/Login";
import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="#dashboard">moneytree</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#dashboard">dashboard</Nav.Link>
            <Nav.Link href="#bot">bot</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link href="#login">
              <LoginIcon />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export { Header };
