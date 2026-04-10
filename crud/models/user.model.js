const mongoose = require ("mongoose")

let userschema = mongoose.Schema({
    name:String,
    password:String,
    email:String
},
{
    timestamps: true ,
}
)

let UserModel = mongoose.model("user" , userschema)

module.exports = {UserModel}
