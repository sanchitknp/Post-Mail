import React, { useEffect, useState } from "react";

import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

import { LinkContainer } from "react-router-bootstrap";
import { Container } from "react-bootstrap";
function HomeScreen({ history }) {
  const [isLogged, setisLogged] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) setisLogged(true);
    else history.push("/login");
  }, [userInfo, isLogged, history]);

  return (
    <Container>
      <center>
        <hr></hr>
        <br></br>
        <br></br>
        <LinkContainer to="/compose">
          <Button variant="dark">Compose Mail</Button>
        </LinkContainer>
        <br />
        <br></br>
        <LinkContainer to="/upload">
          <Button variant="dark">Compose Mail (excel)</Button>
        </LinkContainer>
        <br></br>
        <br></br>
        <LinkContainer to="/history">
          <Button variant="dark">History</Button>
        </LinkContainer>
      </center>
    </Container>
  );
}

export default HomeScreen;
