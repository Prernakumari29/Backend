const mongoose = require ("mongoose")

const connectdb = async ()=>{
    try {
        const res = await mongoose.connect("mongodb://0.0.0.0/chall")
        console.log("mongodb connected")
    } catch (error) {
       console.log("error in connecting db") 
    }
}

module.exports = {connectdb}