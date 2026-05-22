const mongoose = require("mongoose")

const Userschema = new mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   email:{
    type:String,
    required:true,
    unique:true
   },
   provider:{
    type:String
   },
   providerId:{
    type:String
   },
   password:{
    type:String
   }

},
{
    timestamps:true
}
)

const USerModel = mongoose.model("user" , Userschema)
module.exports = {USerModel}
