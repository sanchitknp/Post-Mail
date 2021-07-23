import axios from "axios";
import Cookie from "js-cookie";
import {google} from "googleapis";
import {GoogleLogin} from "react-google-login"

google.options({
  http2: true,
});



const oAuth2Client = new google.auth.OAuth2(
  process.env.REACT_APP_GOOGLE_CLIENT_ID,
  process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
  "http://localhost:3000"
);



export default function Gauth() {

 const axiosApiCall = (url, method, body = {}) =>
  axios({
    method,
    url: `${process.env.REACT_APP_API_BASE_URL}${url}`,
    data: body,
  });

  const onGoogleSuccess = (response) => {
    const code = response.code;
    const profile = response.googleId;

    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.log("access   token", err);
      oAuth2Client.on("tokens", (tokens) => {
        if (tokens.refresh_token) {
          axiosApiCall("/auth/google", "post", {
            refreshToken: tokens.refresh_token,
            profile,
          })
            .then((res) => {
              const { user, token } = res.data;
              Cookie.set("token", token);
            })
            .catch((err) => {
              throw new Error(err);
            });
        } else {
          axiosApiCall("/auth/google", "post", {
            accessToken: tokens.access_token,
            profile,
          })
            .then((res) => {
              const { user, token } = res.data;
              Cookie.set("token", token);
            })
            .catch((err) => {
              throw new Error(err);
            });
        }
      });
    });
  };
  const onGoogleFailure = () => {
    console.log("boomer");
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#151a30",
        color: "white",
      }}
    >
      <h1>Google Oauth Sign In</h1>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Sign in with Google"
        onSuccess={onGoogleSuccess}
        onFailure={onGoogleFailure}
        accessType="offile"
        scope="https://www.googleapis.com/auth/gmail.send"
        className="google-login-button"
      />
    </div>
  );
}
