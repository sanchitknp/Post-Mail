import express from "express";
const app = express();

import AuthRoute from "./routers/AuthRoute.js";
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/auth", AuthRoute);
app.listen(5000, console.log(`Server running on  port 5000`));
