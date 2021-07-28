import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loading from "../components/Loading";
import FormContainer from "../components/FormContainer";
import { sendMail } from "../actions/userActions";

function ComposeScreen({ history }) {
  const [isLogged, setisLogged] = useState(false);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const sendMailer = useSelector((state) => state.sendMail);
  const { loading, error, success } = sendMailer;
  useEffect(() => {
    if (userInfo) setisLogged(true);
    else history.push("/login");
    if (success) history.push("/history");
  }, [userInfo, isLogged, success, history]);

  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState(null);
  const [content, setContent] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (email === "") setMessage("Please enter recepient mail ID");
    else if (subject === "") setMessage("Please enter Subject");
    else if (content === "") setMessage("Email cannot be empty");
    else dispatch(sendMail(userInfo.googleId, email, subject, content));
  };
  return (
    <FormContainer>
      <h1>Compose mail</h1>
      {message ? <Message variant="danger" text={message}></Message> : <></>}

      {error && <Message variant="danger" text={error}></Message>}
      {loading && <Loading></Loading>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>To</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="subject">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control
            type="textarea"
            placeholder="How about you start with 'Sir/Madam'?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button variant="secondary" type="submit">
          Send
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ComposeScreen;
