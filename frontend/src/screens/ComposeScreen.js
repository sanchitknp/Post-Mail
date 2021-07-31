import React, { useEffect, useState } from "react";

import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loading from "../components/Loading";
import FormContainer from "../components/FormContainer";
import { sendMail } from "../actions/userActions";
import { Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
function ComposeScreen({ history }) {
  const [isLogged, setisLogged] = useState(false);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const sendMailer = useSelector((state) => state.sendMail);
  const { loading, error, success } = sendMailer;
  const [from, setFrom] = useState("");
  useEffect(() => {
    if (userInfo) {
      setisLogged(true);
      setFrom(userInfo.email);
    } else history.push("/login");
    if (success) history.push("/history");
  }, [userInfo, isLogged, success, history]);

  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState(null);
  const [content, setContent] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const submitHandler = (e) => {
    e.preventDefault();
    const now = new Date();
    if (email === "") setMessage("Please enter recepient mail ID");
    else if (subject === "") setMessage("Please enter Subject");
    else if (content === "") setMessage("Content cannot be empty");
    else if (from === "") setMessage("Not logged In");
    else if (startDate < now) setMessage("Enter valid date time");
    else {
      if (window.confirm("Are you sure you wish to send this mail?"))
        dispatch(
          sendMail(
            from,
            email,
            subject,
            content,
            startDate.getDate(),
            startDate.getMonth(),
            startDate.getHours(),
            startDate.getMinutes()
          )
        );
    }
  };
  return (
    <Container>
      <LinkContainer to="/">
        <Button variant="light">Back</Button>
      </LinkContainer>
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
          <Form.Group controlId="datetime">
            <Form.Label>Date and Time</Form.Label>
            <br />
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              minDate={new Date()}
              showTimeInput
              dateFormat="Pp"
              shouldCloseOnSelect={false}
            />
            <br></br>
          </Form.Group>
          <Form.Group controlId="content">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={10}
              placeholder="How about you start with 'Sir/Madam'?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></Form.Control>
            <br></br>
          </Form.Group>
          <Button variant="primary" style={{ height: "50px" }} type="submit">
            <center>
              Send <span className="material-icons small">send</span>
            </center>
          </Button>
        </Form>
      </FormContainer>
    </Container>
  );
}

export default ComposeScreen;
