import mongoose from "mongoose";
const contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});
const mailSchema = mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    cc: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    provider: {
      type: String,
    },
    contacts: [contactSchema],
    mailhistory: [mailSchema],
    googleId: {
      type:String,
      required:true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);

export default User;
