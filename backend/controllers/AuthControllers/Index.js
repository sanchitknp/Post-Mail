import jwt from "jsonwebtoken";
import User from "../../models/Usermodels.js";
import { google } from "googleapis";

const AuthController = (req) => {
  const oAuth2Client = new google.auth.OAuth2(
    "944170780765-ia4ed16atb9p1tbu4748uo7rgmpvbegu.apps.googleusercontent.com",
    "0662UJYs9U7ne4Q7lsgrTIui",
    "http://localhost:3000"
  );
let code=  req.body.code

  oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        console.log(err); 
      }
      oAuth2Client.setCredentials(token);
      console.log(token);
  });
};
export default AuthController;
