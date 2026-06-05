const mongoose = require("mongoose")

const donerSchema = new mongoose.Schema({
    foodName:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    description:{
        type:String
    },
    pickUpAddress:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["available" , "claimed" , "completed"],
        default:"available"
    },
   doner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true
   },
   claimeBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"       
    },
},{timestamps:true})

const DonerModel = mongoose.model("doner" , donerSchema)
module.exports = DonerModel;