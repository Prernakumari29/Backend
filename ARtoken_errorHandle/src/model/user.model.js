const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
      name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    provider: {
      type: String,
      enum: ["google", "facebook"],
    },
    provider_id: {
      type: String,
    },
    refreshToken:{
        type:String,
    }
},
{
    timestamps:true,
} 
)

const UserModel = mongoose.model("ARToken" , UserSchema)
module.exports = UserModel;