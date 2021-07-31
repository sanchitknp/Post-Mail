import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
function Header() {
  const dispatch = useDispatch();

  const [isLogged, setisLogged] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) setisLogged(true);
  }, [userInfo, isLogged]);

  const logoutHandler = () => {
    setisLogged(false);

    dispatch(logout());
    <Redirect path="/login" />;
  };
  return (
    <div>
      <Navbar
        bg="dark"
        expand="lg"
        variant="dark"
        collapseOnSelect
        role="Navigation"
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Kabootar</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto nav-right justify-content-end">
              {isLogged ? (
                <NavDropdown title={userInfo.name}>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <b> </b>Login
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
