import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loading from "../components/Loading";

function FormContainer({ children }) {
  return (
    <Container>
      <Row className="justify-content-md-center ">
        <Col md={6} xs={12}>
          {children}
        </Col>
      </Row>
    </Container>
  );
}

export default FormContainer;
