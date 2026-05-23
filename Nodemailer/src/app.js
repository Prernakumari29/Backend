const express = require("express")
const userRoute = require("./routes/userRoutes");
const connected = require("./config/db");
const app = express();
app.use(express.json())
connected()


app.use("/" , userRoute )


module.exports = app;