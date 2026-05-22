const express = require("express");
const connected = require("./config/db");
const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const authRoute = require("./routes/auth.routes");
const { USerModel } = require("./model/user.model");
const cookieParser = require("cookie-parser");
const cors = require("cors")

const app = express();
connected()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5174",
    credentials:true
}))
app.use(passport.initialize())
passport.use(
    new GoogleStrategy(
        {
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_SECRET_KEY,
    callbackURL:process.env.GOOGLE_CALLBACK_URL   
}
 , 

async (accessToken , refreshToken , profile , cb)=>{
//    console.log(profile)
//    return cb(null,profile)
     let email = profile.emails[0].value
     let isexisted = await USerModel.findOne({email})
     
     if(isexisted) return cb(null , isexisted)

     
       let  newuser = await USerModel.create({
            name:profile.name.givenName,
            email:email,
            provider:profile.provider,
            providerId:profile.id,
            
        })
        return cb(null , newuser);
    
}))

app.use("/api/auth" , authRoute )
app.use("/" , (req, res)=>{
   res.send("okay")
})


module.exports = app