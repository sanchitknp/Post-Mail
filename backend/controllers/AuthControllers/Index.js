import User from "../../models/Usermodels.js";
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const AuthController = async (req, res) => {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://localhost:3000"
  );
  let code = req.body.code;

  let jwtToken;
  let refreshToken;
  let payload;

  oAuth2Client.getToken(code, (err, token) => {
    if (err) {
      console.log(err);
    } else {
      oAuth2Client.setCredentials(token);
      console.log(token);

      refreshToken = token.refresh_token;
      jwtToken = token.id_token;

      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      async function verify() {
        try {
          console.log(jwtToken);
          const ticket = await client.verifyIdToken({
            idToken: jwtToken,
            audience: process.env.GOOGLE_CLIENT_ID,
          });

          payload = ticket.getPayload();
          console.log(payload);

          const user = await User.findOne({ googleId: payload.sub });
          if (user) {
            if (refreshToken) {
              user.refreshToken = refreshToken;
            }
            const updateUserData = await user.save();
            console.log("user data updated");
            res.send({
              name: user.name,
              id: user._id,
              email: user.email,
              contacts: user.contacts,
              mailhistory: user.mailhistory,
            });
          } else {
            User.create(
              {
                name: payload.name,
                email: payload.email,
                googleId: payload.sub,
                refreshToken: refreshToken,
              },
              (err, user) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("new user created successfully in database");
                  res.send({
                    name: user.name,
                    id: user._id,
                    email: user.email,
                    contacts: user.contacts,
                    mailhistory: user.mailhistory,
                  });
                }
              }
            );
          }
        } catch {
          console.log("error");
        }
      }

      verify().catch(console.log);
    }
  });
};

export default AuthController;
