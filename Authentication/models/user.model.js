const mongoose = require ("mongoose")

const userschema = mongoose.Schema({
    name:String,
    password:String,
    number:{
        type:String,
        unique:true
    }
},
{
    timestamps : true,
}
)

const UserModel = mongoose.model("user" , userschema)

module.exports = {UserModel}
