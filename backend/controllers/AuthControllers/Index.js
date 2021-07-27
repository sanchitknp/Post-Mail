import User from "../../models/Usermodels.js";
import { google } from "googleapis";
import nodemailer from "nodemailer";

const AuthController = async(req, res) => {
  const oAuth2Client = new google.auth.OAuth2(
    "944170780765-ia4ed16atb9p1tbu4748uo7rgmpvbegu.apps.googleusercontent.com",
    "0662UJYs9U7ne4Q7lsgrTIui",
    "http://localhost:3000"
  );
  let code = req.body.code;
  let accessToken, refreshToken;
  let profile = {};

  oAuth2Client.getToken(code, (err, token) => {

    if (err) {
      console.log(err);
    }
    oAuth2Client.setCredentials(token);

    refreshToken = token.refresh_token;
  });
  
    const user = await User.findOne({ googleId: req.body.googleId });
    if(user)
    {
      res.send({
        name:user.name,
        id:user._id,
        email:user.email,
        contacts=user.contacts,
        mailhistory=user.mailhistory
      });
    }
    else
    {
      oAuth2Client.getToken(code, (err, token) => {
        if (err) {
          console.log(err);
        }
        oAuth2Client.setCredentials(token);
    
        refreshToken = token.refresh_token;
      });
      User.create({name:req.body.profile.name,email:req.body.profile.email,googleId:req.body.googleId,refreshToken:refreshToken},(err,date)=>{
        if(err)
        {
        console.log(err);
        }
      });
      res.send({
        name:user.name,
        id:user._id,
        email:user.email,
        contacts=user.contacts,
        mailhistory=user.mailhistory
      });
    }
    

  // oAuth2Client.setCredentials({ refresh_token: refreshToken });
  // accessToken = oAuth2Client.getAccessToken();

  async function sendMail() {
    try {
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "sankethgb.mec18@itbhu.ac.in",
          clientId:
            "944170780765-ia4ed16atb9p1tbu4748uo7rgmpvbegu.apps.googleusercontent.com",
          clientSecret: "0662UJYs9U7ne4Q7lsgrTIui",
          refreshToken: refreshToken,
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
  sendMail()
    .then((result) => console.log(result))
    .catch((error) => console.log(error));

  res.send("Mail sent");
};
export default AuthController;
