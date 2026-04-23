const mongoose = require ("mongoose")

const usermode = new mongoose.Schema({
    pname:String,
    ptitle:String,
    description:String,
    price:{
        currency:String,
        amount:Number,
    },
    category:{
        type:String,
        enum: ["women" , "men" , "kids" , "unisex"]
    },
    


})

const UserModel = mongoose.model("user" , usermode )

module.exports = {UserModel}