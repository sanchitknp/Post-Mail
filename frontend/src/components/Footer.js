import React from "react";
import { Container, Row, Col } from "react-bootstrap";
function Footer() {
  return (
    <Container style={{ position: "absolute", left: 0, bottom: 0, right: 0 }}>
      <Row>
        <Col className="py-3 text-center">Copyright &copy; Kabootar</Col>
      </Row>
    </Container>
  );
}

export default Footer;
