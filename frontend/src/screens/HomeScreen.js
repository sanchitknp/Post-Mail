import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loading from "../components/Loading";
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
      <LinkContainer to="/compose">
        <Button variant="dark">Compose Mail</Button>
      </LinkContainer>
    </Container>
  );
}

export default HomeScreen;
