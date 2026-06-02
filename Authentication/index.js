const dotenv = require("dotenv")
dotenv.config();


const express = require("express");
const { connectdb } = require("./config/db");
const { UserModel } = require("./models/user.model");
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser");
const { authMiddleWare } = require("./middleware/authMiddleWare");
const cacheInstance = require("./config/cacheInstance");

const app = express();
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieParser())

connectdb();

cacheInstance.on("connect" , ()=>{
    console.log("redis connected")
})

cacheInstance.on("error" , (error)=>{
    console.log("error in redis" , error)
})

// --------------------------------------------------------------Register----------------------
app.post("/register" , async (req , res)=>{
   let {name , password , email ,  number} = req.body

   if(!name || !password || !email || !number){
    return res.send("all fields are required")
   }
   
   const hashedpassword = await bcrypt.hash(password , 10)
   console.log(hashedpassword)


//    --------------------------create------------------------------------
const registered = await UserModel.create({
    name,
    password:hashedpassword,
    email,
    number
})
// ----------------------- creating token------------------------------
const token = jwt.sign({id:registered._id} , 
    process.env.JWT_SECRET_KEY,
    { expiresIn : "10m"}
)

res.cookie("token" , token)


res.json({
    message:"User registed succesful",
    registered,
})

})


// ----------------------------------------------------------------Login----------------------
app.post("/login" , async (req ,res) =>{
    let{password , email} = req.body
    if(!password || !email){
        return res.json("Invalid credentials")
    }
    
    let isExisted = await UserModel.findOne({email})
    if(!isExisted){
        return res.json({
            message:"User not found"
        })
    }

    let haspassword = await bcrypt.compare(password , isExisted.password)
    if(!haspassword){
       return res.json({
            message:"Invalid Credentials"
        })
    }

    let token = jwt.sign({id:isExisted._id} , process.env.JWT_SECRET_KEY , 
        {expiresIn : "10m"}
    )
    res.cookie("token" , token)

    return res.json({
        message: "User founded",
        isExisted
    })
})

// --------------------------------------------Me api ------------------------------------------------
app.get("/me" , authMiddleWare , (req,res)=>{
    return res.status(200).json({
        message: "Logged in user",
        user : req.user
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


app.get("/home" , authMiddleWare , (req,res)=>{
    res.status(200).json({
        message:"succesfully entered in the home"
    })
})

app.post("/logout" , authMiddleWare , async(req,res)=>{

    let token = req.cookies.token

    await cacheInstance.set(token , "blacklisted" , "Ex",5000)
    res.clearCookie("token")

    return res.send("logout successfully")
})

app.listen(3000 , ()=>{
    console.log("Server is running on the port 3000")
})