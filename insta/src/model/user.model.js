const mongoose = require("mongoose")

let userschema = new mongoose.Schema({
       name:{
        type:String,
        unique:true
       },
       comment:{
        type:String,
       }

})

let UserModel = mongoose.model("user" ,userschema)

module.exports = UserModel
