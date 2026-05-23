const mongoose = require("mongoose")

const connected = async ()=>{
    try {
        let res = await mongoose.connect("mongodb://0.0.0.0/nodemail")
        console.log("mongodb connected")
    } catch (error) {
        console.log("errorin connecting db")
    }
}

module.exports = connected;