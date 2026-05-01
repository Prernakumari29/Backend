const mongoose = require("mongoose")

const connectdb = async()=>{
    try {
        const res = await mongoose.connect(process.env.MONGO_URI)
        console.log("mongodb connected")
    } catch (error) {
       console.log("something went wrong" , error)
    }
}

module.exports = connectdb

