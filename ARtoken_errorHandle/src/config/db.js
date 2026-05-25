const mongoose = require("mongoose")

const connected = async()=>{
    try {
        const res = await mongoose.connect("mongodb://0.0.0.0/ARToken")
        console.log("mongodb connected")
    } catch (error) {
        console.log("error in connecting db")
    }
}

module.exports = connected;