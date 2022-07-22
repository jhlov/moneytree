import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { getAuth } from "firebase/auth";
import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useSelector } from "react-redux";
import { RootState } from "store";

const Header = () => {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const userEmail = useSelector((state: RootState) => state.auth.userEmail);

  const onLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    getAuth().signOut();
  };

  return (
    <Navbar expand="sm">
      <Container>
        <Navbar.Brand href="#dashboard">moneytree</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#dashboard">dashboard</Nav.Link>
            <Nav.Link href="#bot">bot</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {isLogin ? (
              <>
                <Navbar.Text>{userEmail}</Navbar.Text>

                <OverlayTrigger
                  key="tooltip-logout"
                  placement="bottom"
                  overlay={
                    <Tooltip id="tooltip-logout">
                      <span>Logout</span>{" "}
                    </Tooltip>
                  }
                >
                  <Nav.Link onClick={onLogout}>
                    <LogoutIcon />
                  </Nav.Link>
                </OverlayTrigger>
              </>
            ) : (
              <OverlayTrigger
                key="tooltip-login"
                placement="bottom"
                overlay={
                  <Tooltip id="tooltip-login">
                    <span>Login</span>{" "}
                  </Tooltip>
                }
              >
                <Nav.Link href="#login">
                  <LoginIcon />
                </Nav.Link>
              </OverlayTrigger>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export { Header };
