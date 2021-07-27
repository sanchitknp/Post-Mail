import express from "express";
import asyncHandler from "express-async-handler";
import passport from "passport";
import AuthController from "../controllers/AuthControllers/Index.js";
import { google } from "googleapis";
import nodemailer from "nodemailer";
import https from "https";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("hii");
  res.send("Welcome to my Google Oauth express server");
});

router.post("/google", AuthController);

export default router;
