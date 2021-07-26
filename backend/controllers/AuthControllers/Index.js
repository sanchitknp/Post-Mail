import jwt from "jsonwebtoken";
import User from "../../models/Usermodels.js";
import { google } from "googleapis";

const AuthController = (code) => {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://localhost:3000"
  );

  oAuth2Client.getToken(code, (err, token) => {
    {
      if (err) {
        console.log(err);
      }
      console.log(token);
    }
    return "hi";
  });
};
export default AuthController;
