import jwt from "jsonwebtoken";
import User from "../../models/Usermodels.js";
import { google } from "googleapis";

const AuthController = (req) => {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://localhost:3000"
  );
  console.log(req);
  return oAuth2Client.getToken(req.code, (err, token) => {
    {
      data: token.refresh_token;
    }
  });
};
export default AuthController;
