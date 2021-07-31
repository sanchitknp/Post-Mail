import { GoogleLogin } from "react-google-login";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loading from "../components/Loading";
import { login } from "../actions/userActions";

import { Container } from "react-bootstrap";

export default function Gauth({ location, history }) {
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo != null) {
      console.log("success");
      history.push(redirect);
    }
    console.log("yaha aagya hai");
  }, [history, userInfo, redirect]);

  const onGoogleSuccess = (response) => {
    const code = response.code;
    dispatch(login(code));
  };
  const onGoogleFailure = () => {
    console.log("boomer");
  };
  return (
    <Container>
      <h1>Sign In</h1>
      {error && <Message variant="danger" text={error}></Message>}
      {loading && <Loading></Loading>}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",

          color: "white",
        }}
      >
        <GoogleLogin
          clientId="944170780765-ia4ed16atb9p1tbu4748uo7rgmpvbegu.apps.googleusercontent.com"
          buttonText="Sign in with Google"
          onSuccess={onGoogleSuccess}
          onFailure={onGoogleFailure}
          responseType="code"
          scope="https://mail.google.com/"
          accessType="offline"
          className="google-login-button"
          cookiePolicy={"single_host_origin"}
          redirectUri="http://localhost:3000"
        />
      </div>
    </Container>
  );
}
