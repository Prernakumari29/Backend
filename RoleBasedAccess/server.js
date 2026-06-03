const express = require("express");
const connected = require("./config/db");
const UserModel = require("./models/user.model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")

const app = express();
app.use(express.json())
app.use(cookieParser())

connected();


// --------------------------------------------------------register --------------------------------------------------------------------

app.post("/register" , async(req ,res)=>{
    let {name , email , password , role} = req.body;
    if(!email || !password || !role){
        return res.status(400).json({
            message:"all fields are important"
        })
    }

    let isexisted = await UserModel.findOne({email})
    if(isexisted){
        return res.status(409).json({
            message:"User already existed"
        })
    }

    const hashpass = await bcrypt.hash(password , 10)

    const user = await UserModel.create({
        name,
        email,
        password:hashpass,
        role
    })
   
    const token = jwt.sign({id:user._id , role:user.role} , "asdfghjklpoiuytrewqxcvbnm", {expiresIn:"1h"})

    res.cookie("token" , token)

    res.status(201).json({
        message:`${name} you are succesfully register`
    })


})

app.post("/login" , async(req,res) =>{
    let {email , password} = req.body;

    if(!email || !password){
        res.status(400).json({
            message:"all fields required"
        })
    }

    let existed = await UserModel.findOne({email})

    if(!existed){
        res.status(404).json({
            message:"User not found"
        })
    }

    const token = jwt.sign({id:existed._id , role:existed.role} , "asdfghjklpoiuytrewqxcvbnm" , {expiresIn:"1h"} ) 

    res.cookie("token" , token)

    return res.status(200).json({
      message: "Login Successful",
    })
})


app.listen(3000 , ()=>{
    console.log("server is running ")
})