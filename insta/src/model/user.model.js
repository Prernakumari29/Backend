const mongoose = require("mongoose")

let userschema = new mongoose.Schema({
       username:{
              type:String,
              required:true,
              unique:true,
              trim:true
       },
       name:{
              type:String,
              required:true,
              trim:true
       },
       email:{
              type:String,
              required:true,
              unique:true,
              trim:true
       },
       mobile:{
              type:String,
              minlength:10,
              maxlength:10,
              trim:true,
       },
       password:{
              type:String,
              trim:true,
              minlength:6,
              required:true,
       },
       follwers:[
              {
                     type:mongoose.Schema.Types.ObjectId,
                     ref:"users",                     
              },
       ],
       followings:[
              {
                     type:mongoose.Schema.Types.ObjectId,
                     ref:"users"
              }
       ],
       post:[
              {
                type:mongoose.Schema.Types.ObjectId,
                ref:"posts"
              },
       ],
       isActive:{
              type:Boolean,
              default:true
       },

},
{
       timestamps:true
})

let UserModel = mongoose.model("users" ,userschema)

module.exports = UserModel
