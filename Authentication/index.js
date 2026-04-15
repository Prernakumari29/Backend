const express = require("express");
const { connectdb } = require("./config/db");
const { UserModel } = require("./models/user.model");
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")

const app = express();
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

connectdb();

app.post("/register" , async (req , res)=>{
   let {name , password , number} = req.body

   if(!name || !password || !number){
    return res.send("all fields are required")
   }
   
   const hashedpassword = await bcrypt.hash(password , 10)
   console.log(hashedpassword)


//    --------------------------create------------------------------------
const registered = await UserModel.create({
    name,
    password:hashedpassword,
    number
})
// ----------------------- creating token------------------------------
const token = jwt.sign({id:registered._id} , 
    "VlGUpG75cdvh5AQGlnxVWc6VmJtR1lDqi8lkEjDnxBR",
    { expiresIn : "1m"}
)

res.cookie("auth-token" , token)


res.json({
    message:"User registed succesful",
    registered,
})

})

// -----------------------------------------Read----------------------------------------
app.get("/getting" , async(req ,res)=>{
  let users = await UserModel.find()
  if(!users){
    return res.json({
        message:"nothing found"
    })
  }
  return res.json({
    message:"user found",
    users,
  })

})

app.listen(3000 , ()=>{
    console.log("Server is running on the port 3000")
})