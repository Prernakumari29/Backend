const mongoose = require("mongoose")

const authModel = new mongoose.Schema({
    name:String,
    email:String,
    password:String,

    isAdmin:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

const UserModel = mongoose.model("authmodel" , authModel)

module.exports = UserModel

