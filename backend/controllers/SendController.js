import User from "../models/Usermodels.js";
import schedule from "node-schedule";
import nodemailer from "nodemailer";

export default async function sendMail(req, res) {
  const user = await User.findOne({ email: req.body.from });

  try {
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
    const day = req.body.date;
    const month = req.body.month;
    const hours = req.body.hours;
    const minutes = req.body.minutes;

    const date = new Date(2021, month, day, hours, minutes, 0);
    const job = schedule.scheduleJob(date, () => {
      transport.sendMail(mailOptions, async (err, info) => {
        if (err) {
          console.log("error occurred", err);
        } else {
          console.log("email sent", info);
          let hist = user.mailhistory;
          info.accepted.forEach((mail) => {
            hist.push({
              cc: mail,
              subject: req.body.subject,
              content: req.body.content,
              year:2021,
              day:day,
              minute: minutes,
              hour:hours,
              month: month,
            });
          });
        
          let doc = await User.findOneAndUpdate(
            { email: user.email },
            { mailhistory: hist }
          );
          res.send(hist);
        }
      }); 
    });
    
    
  } catch (error) {
    return error;
  }
}
