import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./PetsNavbar.css";
import useAuth from "../../hooks/useAuth.js";
import { NavLink } from "react-router-dom";
import PetsModal from "../Modals/PetsModal";

function PetsNavbar() {
  const { activeUser, onLogOut, onOpenModal } = useAuth();
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand to="/" as={NavLink}>
            <img src="/AdopcyLogo.png" width="60" height="30" alt="" />
            Adopcy
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link to="/pets/" as={NavLink}>
                Search
              </Nav.Link>
              {activeUser && (
                <>
                  <Nav.Link to="/mypets" as={NavLink}>
                    My Pets
                  </Nav.Link>
                  <Nav.Link to="/profile" as={NavLink}>
                    My Profile
                  </Nav.Link>
                  {activeUser.isAdmin && (
                    <NavDropdown title="Admin" id="basic-nav-dropdown">
                      <NavDropdown.Item to="/admin/addpet" as={NavLink}>
                        Add Pet
                      </NavDropdown.Item>
                      <NavDropdown.Item to="/admin/getpets" as={NavLink}>
                        Get Pets
                      </NavDropdown.Item>
                      <NavDropdown.Item to="/admin/getusers" as={NavLink}>
                        Get Users
                      </NavDropdown.Item>
                    </NavDropdown>
                  )}
                </>
              )}
            </Nav>
            <Nav className="me-auto auth">
              {!activeUser ? (
                <Nav.Link onClick={onOpenModal}>Log In</Nav.Link>
              ) : (
                <Nav.Link onClick={onLogOut}>Log Out</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <PetsModal />
    </div>
  );
}

export default PetsNavbar;
