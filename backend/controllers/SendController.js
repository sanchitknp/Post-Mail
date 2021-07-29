import User from "../models/Usermodels.js";
import { google } from "googleapis";
import nodemailer from "nodemailer";

export default async function sendMail(req, res) {
  const user = await User.findOne({ email: req.body.from });

  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "sankethgb.mec18@itbhu.ac.in",
        clientId:
          "944170780765-ia4ed16atb9p1tbu4748uo7rgmpvbegu.apps.googleusercontent.com",
        clientSecret: "0662UJYs9U7ne4Q7lsgrTIui",
        refreshToken: user.refreshToken,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const mailOptions = {
      from: user.email, // sender
      to: req.body.email, // receiver
      subject: req.body.subject, // Subject
      text: req.body.content,
    };
    const result = await transport.sendMail(mailOptions);

    res.send({
      email: user.email, // receiver
      subject: req.body.subject, // Subject
      content: req.body.content,
    });
  } catch (error) {
    return error;
  }
}
