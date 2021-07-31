import React from "react";
import { Container, Row, Col } from "react-bootstrap";
function Footer() {
  return (
    <Container
      style={{
        position: "relative",
        left: 0,
        bottom: 0,
        right: 0,
        minHeight: "500px",
      }}
    >
      <Row>
        <Col
          className="py-3 text-center"
          style={{ position: "absolute", left: 0, bottom: 0, right: 0 }}
        >
          Copyright &copy; Kabootar
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
