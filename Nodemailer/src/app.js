const express = require("express")
const userRoute = require("./routes/userRoutes");
const connected = require("./config/db");
const cors = require("cors")
const app = express();
app.use(cors({
    origin:"http://localhost:5173"
}   
))
app.use(express.json())
connected()


app.use("/" , userRoute )


module.exports = app;