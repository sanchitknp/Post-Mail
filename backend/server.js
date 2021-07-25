import express from 'express'
import bodyParser from 'body-parser';
const app = express()

import AuthRoute from "./routers/AuthRoute.js";

app.use('/',AuthRoute)
app.listen(
    5000,
    console.log(
      `Server running on  port 5000`
    )
)