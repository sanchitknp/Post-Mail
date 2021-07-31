import User from "../models/Usermodels.js";
const cron = require("node-cron");
import nodemailer from "nodemailer";

export default async function sendMail(req, res) {
  const user = await User.findOne({ email: req.body.from });
  console.log(req.body.emails)
  try {
    console.log(req.body.emails);
    const transport = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        type: "OAuth2",
        user: user.email,
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
      to: req.body.emails, // receiver
      subject: req.body.subject, // Subject
      text: req.body.content,
    };
    const result = await transport.sendMail(mailOptions);
    
    let hist = user.mailhistory;
    (req.body.emails).forEach(mail => {
      hist.push({cc:mail,subject:req.body.subject,content:req.body.content})
    });


    let doc = await User.findOneAndUpdate(
      { email: user.email },
      {mailhistory: hist }
    );
  console.log("success")
  } catch (error) {
    return error;
  }
}
