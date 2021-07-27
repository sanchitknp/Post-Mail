

   import User from "../../models/Usermodels.js";
    import { google } from "googleapis";


    export default const AuthController = async(req, res) => {
    const oAuth2Client = new google.auth.OAuth2(
    "944170780765-ia4ed16atb9p1tbu4748uo7rgmpvbegu.apps.googleusercontent.com",
    "0662UJYs9U7ne4Q7lsgrTIui",
    "http://localhost:3000"
  );
    const code = req.body.code;
    const  refreshToken;
  
  
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
      User.create({name:req.body.profile.name,email:req.body.profile.email,googleId:req.body.googleId,refreshToken:refreshToken},(err,user)=>{
        if(err)
        {
        console.log(err);
        }
        else
        {
          res.send({
        name:user.name,
        id:user._id,
        email:user.email,
        contacts=user.contacts,
        mailhistory=user.mailhistory
           });
         } 
       });









      }
  
       
    