import React, { useState, useEffect } from "react";
import { Container, Button, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";

function HistoryScreen({ history }) {
  const [isLogged, setisLogged] = useState(false);
  const [hist, setHist] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (userInfo) {
      setisLogged(true);
      setHist(userInfo.mailhistory);
    } else history.push("/login");
  }, [userInfo, isLogged, history]);
  return (
    <Container>
      <LinkContainer to="/">
        <Button variant="light">Back</Button>
      </LinkContainer>
      <br></br>
      {hist.map((histo) => (
        <Card
          border="secondary"
          style={{ width: "20rem", height: "32rem" }}
          className="m-3 py-3 my-3 tv"
        >
          <Card.Header>{histo.cc}</Card.Header>
          <Card.Body>
            <hr></hr>

            <Card.Title>{histo.subject}</Card.Title>
            <Card.Text>{histo.content}</Card.Text>
          </Card.Body>{" "}
        </Card>
      ))}
    </Container>
  );
}

export default HistoryScreen;
