const dotenv = require("dotenv")
dotenv.config();


const express = require ("express")
const { connectdb } = require("./config/db")

const proRoute = require("./routes/product.route")
const authrouter = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./middleware/authMiddleware");
const adminMiddleware = require("./middleware/adminMiddleware");




const app = express ()

app.use(express.json())
app.use(cookieParser())

connectdb()

app.use("/api/pro"  ,authMiddleware , adminMiddleware , proRoute )
app.use("/api/auth" , authrouter )



app.listen(3000 , ()=>{
    console.log("server is running on the port 3000")
})