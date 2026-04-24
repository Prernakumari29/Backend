const bcrypt = require("bcrypt")
const UserModel = require("../module/auth.model")
const jwt = require("jsonwebtoken")

const registerController = async (req , res)=>{
  let {name , email , password  } = req.body

  if(!name || !email || !password){
    return res.staus(400).json({
        message:"all fields are required"
    })
  }

  const isExisted = await UserModel.findOne({email})
  if(isExisted){
    return res.staus(409).json({
        message:"User already existed"
    })
  }

  let hashpassword = await bcrypt.hash(password, 10)

  const users = await UserModel.create({
    name,
    email,
    password:hashpassword
  })

  const authToken = jwt.sign({id:users._id} , process.env.SECRET_KEY , {expiresIn : "1h"})

  if(!authToken){
    return res.status(404).json({
        message:"token not found"
    })
  }

  res.cookie("authToken" , authToken)

  return res.status(200).json({
    message:"User registered",
    user: users
  })
}

module.exports = {registerController}