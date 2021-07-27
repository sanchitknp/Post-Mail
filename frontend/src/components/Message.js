import React from "react";
import { Alert } from "react-bootstrap";
function Message({ variant, text }) {
  return <Alert variant={variant}>{text}</Alert>;
}
Message.defaultProps = {
  variant: "info",
};

export default Message;
