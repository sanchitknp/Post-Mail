import express from "express";
import User from "../models/Usermodels.js";
import asyncHandler from "express-async-handler";
import passport from 'passport';
import AuthController from "../controllers/AuthControllers/Index.js";

const router = express.Router();

router.get("/", (req, res) =>
  res.send("Welcome to my Google Oauth express server")
);

router.post(
  "/google",
  passport.authenticate("google-token", { session: false }),
  AuthController.googleLogin
);

export default router
