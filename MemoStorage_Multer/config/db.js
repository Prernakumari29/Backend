const mongoose = require("mongoose");

const connectdb = async(req , res)=>{
    try {
        const connect = await mongoose.connect("mongodb://0.0.0.0/MemoStr")
        console.log("mongodb connected")
    } catch (error) {
       return res.status(500).json({
        message:"Error in db connection"
       }) 
    }
}
module.exports = connectdb;