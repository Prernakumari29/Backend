const mongoose = require("mongoose")

const userschema = new mongoose.Schema({
    name:String,
    password:String,
    email:String,
    number:Number
},{
    timestamps:true
})

const UserModel = mongoose.model("user" , userschema)

module.exports = {UserModel}