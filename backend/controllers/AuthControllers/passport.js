import passport from "passport";
import { config } from "dotenv";
import { User } from "../../models/Usermodels.js";
var GoogleStrategy = require("passport-google-oauth20").Strategy;

config();
// const getProfile = (profile) => {
//   const { id, displayName, emails, provider } = profile;
//   if (emails && emails.length) {
//     const email = emails[0].value;
//     return { googleId: id, name: displayName, email, provider };
//   }
//   return null;
// };
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
    }
  )
);

// Saves user's ID to a session
passport.serializeUser((user, done) => {
  done(null, user.id);
});
// Retrieve user's ID from a session
passport.deserializeUser((id, done) => {
  User.findByPk(id).then((user) => {
    done(null, user);
  });
});
