const dotenv = require("dotenv")
dotenv.config();

const express = require("express");
const { connectdb } = require("./config/db");
const cookieParser = require("cookie-parser")
const authRoute = require("./routes/auth.routes")

const app = express();
 app.use(express.json())
 app.use(cookieParser())
 
connectdb();

app.use("/api/auth" , authRoute)


const Port = process.env.PORT || 4000
app.listen(Port , ()=>{
    console.log(`server is running on ${Port}`)
})