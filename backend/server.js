import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
const app = express();
import dotenv from "dotenv";
dotenv.config();

connectDB();
import SendRoute from "./routers/SendRoute.js";
import AuthRoute from "./routers/AuthRoute.js";
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/auth", AuthRoute);
app.use("/send", SendRoute);

const __dirname = path.resolve();
if (process.env.MODE === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.listen(
  process.env.PORT || 5000,
  console.log(`Server running on  port 5000`)
);
