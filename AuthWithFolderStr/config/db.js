const mongoose = require("mongoose")

const connectdb = ()=>{
    try {
        const res = mongoose.connect(process.env.MONGO_URL)
        console.log("mongodb connected")
    } catch (error) {
        console.log("error in connecting db" , error)
    }
}

module.exports = {connectdb}