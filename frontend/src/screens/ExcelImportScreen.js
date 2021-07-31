import React, { useEffect, useState } from "react";

import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loading from "../components/Loading";
import FormContainer from "../components/FormContainer";
import { sendMail } from "../actions/userActions";
import * as XLSX from "xlsx";
import { LinkContainer } from "react-router-bootstrap";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
function ExcelScreen({ history }) {
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

  const [emails, setEmails] = useState([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState(null);
  const [variant, setVariant] = useState("danger");
  const [content, setContent] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const submitHandler = (e) => {
    e.preventDefault();
    const now = new Date();

    if (emails.length === 0) {
      setMessage("Please upload file");
      setVariant("danger");
    } else if (subject === "") {
      setMessage("Please enter Subject");
      setVariant("danger");
    } else if (content === "") {
      setMessage("Content cannot be empty");
      setVariant("danger");
    } else if (from === "") {
      setMessage("Not logged In");
      setVariant("danger");
    } else if (startDate < now) {
      setMessage("Enter valid date time");
      setVariant("danger");
    } else {
      if (window.confirm("Are you sure you wish to send this mail?"))
        dispatch(
          sendMail(
            from,
            emails,
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

  const readxl = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        console.log(data);
        const newData = data.map(function (row) {
          return row.Email;
        });
        resolve(newData);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise
      .then((d) => {
        setEmails(d);
        setVariant("success");
        setMessage("File upload Success");
      })
      .catch((error) => {
        setVariant("danger");
        setMessage("File upload failed");
      });
  };

  return (
    <Container>
      <LinkContainer to="/">
        <Button variant="light">Back</Button>
      </LinkContainer>
      <FormContainer>
        <h1>Compose mass mail</h1>
        {message ? <Message variant={variant} text={message}></Message> : <></>}

        {error && <Message variant="danger" text={error}></Message>}
        {loading && <Loading></Loading>}
        <Form onSubmit={submitHandler}>
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
            <br />

            <Form.Group controlId="file">
              <Form.Label>
                Upload file (.xlsx file with email IDs in column A)
              </Form.Label>
              <br />
              <Form.Control
                className="btn btn-secondary"
                type="file"
                onChange={(e) => readxl(e.target.files[0])}
              ></Form.Control>
            </Form.Group>
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

export default ExcelScreen;
