const express = require("express");
const connected = require("./config/db");
let cookieParser = require("cookie-parser")
const app = express();
app.use(express.json())
app.use(cookieParser());

const userRouter = require("./router/user.router");
const errorMiddleware = require("./middleware/error.middleware");
const ApiResponse = require("./utils/apiResponse");
const authMiddleware = require("./middleware/auth.middleware");
connected();

app.use("/" , userRouter )

app.get("/home" , authMiddleware, (req, res)=>{

    res.status(200).json(new ApiResponse("home fetched Hello"));

})


app.use(errorMiddleware)
module.exports = app;