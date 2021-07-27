import React from "react";
import { Spinner } from "react-bootstrap";
function Loading() {
  return (
    <div>
      <Spinner
        animation="border"
        role="status"
        style={{
          width: "100px",
          height: "100px",
          margin: "auto",
          display: "block",
          color: "blue",
        }}
      ></Spinner>
    </div>
  );
}

export default Loading;
