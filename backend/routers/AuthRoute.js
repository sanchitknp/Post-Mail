import express from "express";
import asyncHandler from "express-async-handler";
import passport from "passport";
import AuthController from "../controllers/AuthControllers/Index.js";
import { google } from "googleapis";
import nodemailer from "nodemailer";
import https from "https";

const router = express.Router();

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:3000"
);

router.get("/", (req, res) => {
  console.log("hii");
  res.send("Welcome to my Google Oauth express server");
});

router.post("/google", (req, res) => {
  const authCode = req.body.code;

  const data = new TextEncoder().encode(
    JSON.stringify({
      code: authCode,
      client_id: `${process.env.GOOGLE_CLIENT_ID}`,
      client_secret: `${process.env.GOOGLE_CLIENT_SECRET}`,
      redirect_uri: "http://localhost:3000",
      grant_type: "authorization_code",
    })
  );

  const options = {
    hostname: "oauth2.googleapis.com",
    port: 443,
    path: "/token",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
  };

  const requ = https.request(options, (resu) => {
    console.log(`statusCode: ${resu.statusCode}`);

    resu.on("data", (d) => {
      res.send(d);
    });
  });

  requ.on("error", (error) => {
    console.error(error);
  });

  requ.write(data);
  requ.end();

  // const transport = nodemailer.createTransport({
  //   host: "smtp.gmail.com",
  //   port: 465,
  //   secure: true,
  //   auth: {
  //     type: "OAuth2",
  //     user: "sankethgb.mec18@itbhu.ac.in", //your gmail account you used to set the project up in google cloud console"
  //     clientId: `${process.env.GOOGLE_CLIENT_ID}`,
  //     clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
  //     refreshToken: `${refreshToken}`,
  //     accessToken: `${refreshToken}`,
  //   },
  // });

  // const mailOptions = {
  //   from: "geebiegamer@gmail.com", // sender
  //   to: "sankethgb2000@gmail.com", // receiver
  //   subject: "My tutorial brought me here", // Subject
  //   html: "<p>You have received this email using nodemailer, you are welcome ;)</p>", // html body
  // };
  // transport.sendMail(mailOptions, function (err, result) {
  //   if (err) {
  //     res.send({
  //       message: err,
  //     });
  //   } else {
  //     transport.close();
  //   }
  // });

  //res.send(AuthController(req.body.code));
  res.send("mail sent");
});

export default router;
