import mongoose from "mongoose";
//import { INTEGER } from "sequelize/types";
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
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    hour: {
      type: Number,
      required: true,
    },
    day: {
      type: Number,
      required: true,
    },
    minute: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
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
