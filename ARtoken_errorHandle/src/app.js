const express = require("express");
const connected = require("./config/db");
const app = express();
app.use(express.json())

const userRouter = require("./router/user.router");
const errorMiddleware = require("./middleware/error.middleware");
connected();

app.use("/" , userRouter )


app.use(errorMiddleware)
module.exports = app;