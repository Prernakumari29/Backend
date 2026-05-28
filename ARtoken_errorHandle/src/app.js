const express = require("express");
const connected = require("./config/db");
let cookieParser = require("cookie-parser");
let cors = require("cors")
const app = express();
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

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