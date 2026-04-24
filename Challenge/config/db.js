const mongoose = require ("mongoose")

const connectdb = async ()=>{
    try {
        const res = await mongoose.connect(process.env.MONGO_URI)
        console.log("mongodb connected")
    } catch (error) {
       console.log("error in connecting db" ,error) 
    }
}

module.exports = {connectdb}