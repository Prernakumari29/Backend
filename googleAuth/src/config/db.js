const mongoose = require("mongoose")

const connected = async ()=>{
     try {
        const res = await mongoose.connect(process.env.MONGO_URL)
        console.log("mongodb connected")
     } catch (error) {
        console.log("error in db" , error)
     } 
}

module.exports = connected