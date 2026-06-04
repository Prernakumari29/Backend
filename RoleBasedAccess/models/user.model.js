const mongoose = require("mongoose")

const userschema = new mongoose.Schema({
    name:{
        type:String,       
    },
    email:{
        type:String,  
        unique:true,     
    },
    password:{
        type:String,       
    },
    role:{
        type:String,
        required:true,
        enum:["admin" , "ngo", "user"]
    }
},{timestamps:true})

const UserModel = mongoose.model("user" , userschema)
module.exports = UserModel;