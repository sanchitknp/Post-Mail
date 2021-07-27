import User from "../../models/Usermodels.js";
import { google } from "googleapis";
import {OAuth2Client} from 'google-auth-library';
import jwt from 'jsonwebtoken'
import nodemailer from "nodemailer";




const AuthController = async(req, res) => {
  const oAuth2Client = new google.auth.OAuth2(
    "944170780765-ia4ed16atb9p1tbu4748uo7rgmpvbegu.apps.googleusercontent.com",
    "0662UJYs9U7ne4Q7lsgrTIui",
    "http://localhost:3000"
  );  
  let code = req.body.code;
  
  let jwtToken;
  let refreshToken;

  oAuth2Client.getToken(code, (err, token) => {
    if (err) {
      console.log(err);
    }
    else{
    oAuth2Client.setCredentials(token);
console.log(token)

    refreshToken = token.refresh_token;
    jwtToken = token.id_token;
    
   
 
  const client = new OAuth2Client("944170780765-ia4ed16atb9p1tbu4748uo7rgmpvbegu.apps.googleusercontent.com");
  async function verify() {
    console.log(jwtToken)
    const ticket = await client.verifyIdToken({
        idToken: jwtToken,
        audience: "944170780765-ia4ed16atb9p1tbu4748uo7rgmpvbegu.apps.googleusercontent.com",  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    
    const user = await User.findOne({ googleId: payload.sub });
    if(user)
    {
      if(refreshToken){
      user.refreshToken =refreshToken
      }
      const updateUserData = await user.save()
      console.log("user data updated")
      res.send({
        name:user.name,
        id:user._id,
        email:user.email,
        contacts:user.contacts,
        mailhistory:user.mailhistory
      });
    }
    else
    {
    
     User.create({name:payload.name,email:payload.email,googleId:payload.sub,refreshToken:refreshToken},(err,date)=>{
        if(err)
        {
        console.log(err);
        }
        else{
         console.log("new user created successfully in database")
        }
      });
     
    }
    
    
  }


  verify().catch(console.error);

}
}); 
 


/*
  async function sendMail() {
    try {
      const transport = nodemailer.createTransport({
        service: "gmail",
        secure : false,
        auth: {
          type: "OAuth2",
          user: "sankethgb.mec18@itbhu.ac.in",
          clientId:
            "944170780765-ia4ed16atb9p1tbu4748uo7rgmpvbegu.apps.googleusercontent.com",
          clientSecret: "0662UJYs9U7ne4Q7lsgrTIui",
          refreshToken: refreshToken,
          accessToken: accessToken,
        }, tls: {
          rejectUnauthorized: false
        }
      });
      const mailOptions = {
        from: "e433271@gmail.com", // sender
        to: "sanchit0841@gmail.com", // receiver
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

  res.send("Mail sent"); */

};

export default AuthController;
