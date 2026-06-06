const express = require("express");
const connected = require("./config/db");
const UserModel = require("./models/user.model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser");
const DonerModel = require("./models/Doner.model");
const authmiddleware = require("./middleware/auth.middleware");
const authorizerole = require("./middleware/roleMiddleware");
const cors = require("cors")

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

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

// ---------------------------------------------------------------login------------------------------------------------------------------

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
      existed
    })
})


// ---------------------------------------------------------------------Donation--------------------------------------------------------

app.post("/donate" , authmiddleware , authorizerole("user") , async(req,res)=>{
    let {foodName , quantity , description , pickUpAddress , status } = req.body

    const donation = await DonerModel.create({
        foodName,
        quantity,
        description,
        pickUpAddress,
        status,
        doner:req.user.id
    })

    return res.status(201).json({
        message:"donation  created succesfully"
    })
})

// -----------------------------------------------------getAvailableDonation-------------------------------------------------

app.get("/getAvailableDonation" , authmiddleware , authorizerole("ngo") , async(req ,res)=>{

    const donations = await DonerModel.find({ status:"available"}).populate("doner")

    return res.status(200).json({
        donations
    })

})

// ----------------------------------------------------claim DOnation-------------------------------------------------------------

app.patch("/claim/:id" , authmiddleware , authorizerole("ngo") , async(req,res)=>{

    const donationId = req.params.id

    const donation = await DonerModel.findById(donationId)

    if(!donation){
       return res.status(404).json({
            message:"item not found"
        })
    }

    if(donation.status !== "available"){
        return res.status(400).json({
            message:"item already claimed"
        })
    }

    donation.status = "claimed"

    donation.claimBy = req.user.id

    await donation.save()

    return res.status(200).json({
         message:"donation claimed successfully",
         donation
    })

})


app.listen(3000 , ()=>{
    console.log("server is running ")
})
