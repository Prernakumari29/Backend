const mongoose = require("mongoose")

let connectdb = async ()=>{
    try {
        let res = await mongoose.connect("mongodb://0.0.0.0/cdb")
        console.log("mongoDb connected succesfully")
    } catch (error) {
        console.log("error generate in connecting DB " , error)
    }
}

module.exports = {connectdb}