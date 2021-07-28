import express from "express";
import SendController from "../controllers/SendController.js";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("hii");
  res.send("Welcome to my Google Oauth express server");
});

router.put("/", SendController);

export default router;
