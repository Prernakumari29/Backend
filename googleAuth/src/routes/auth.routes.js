const express = require("express");
const passport = require("passport");
let jwt = require("jsonwebtoken")

const router = express.Router();

router.get("/google" , passport.authenticate("google" , {scope:["profile","email"] , session:false}) )

router.get("/google/callback" , passport.authenticate("google" , {failureRedirect:"/" , session:false}) , 
(req , res)=>{
    let token = jwt.sign({id:req.user._id} , process.env.JWT_SECRET, {expiresIn:"1h"})
    res.cookie("token" , token)
    // res.send("all done")
    return res.redirect("http://localhost:5174/home")
   
} )

module.exports = router