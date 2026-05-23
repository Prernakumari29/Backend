const mongoose = require("mongoose")

const userschema = mongoose.Schema({
    email:String,
    otp:Number,
    expiresAt:Number
})

const OtpModel = mongoose.model("otp" , userschema)

module.exports = OtpModel;