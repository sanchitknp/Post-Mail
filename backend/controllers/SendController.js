import User from "../../models/Usermodels.js";
import { google } from "googleapis";
import nodemailer from "nodemailer";

export default async function sendMail(req, res) {
  const oAuth2Client = new google.auth.OAuth2(
    "944170780765-ia4ed16atb9p1tbu4748uo7rgmpvbegu.apps.googleusercontent.com",
    "0662UJYs9U7ne4Q7lsgrTIui",
    "http://localhost:3000"
  );
  oAuth2Client.setCredentials(req.refreshToken);

  accessToken = oAuth2Client.getAccessToken();

  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "sankethgb.mec18@itbhu.ac.in",
        clientId:
          "944170780765-ia4ed16atb9p1tbu4748uo7rgmpvbegu.apps.googleusercontent.com",
        clientSecret: "0662UJYs9U7ne4Q7lsgrTIui",
        refreshToken: req.refreshToken,
        accessToken: accessToken,
      },
    });
    const mailOptions = {
      from: "geebiegamer@gmail.com", // sender
      to: "sankethgb2000@gmail.com", // receiver
      subject: "My tutorial brought me here", // Subject
      html: "<p>You have received this email using nodemailer, you are welcome ;)</p>", // html body
    };
    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}
