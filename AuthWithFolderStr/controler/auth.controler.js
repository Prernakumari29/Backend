const { UserModel } = require("../module/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registercontroller = async(req , res)=>{
    let{name , password , email , number} = req.body

    if(!name || !password || !email || !number){
        return res.json({
            message:"all fields are required"
        })
    }

    let isExisted = await UserModel.findOne({email})

    if(isExisted){
        return res.json({
            message: "User already exist"
        })
    }

    const hashpassword = await bcrypt.hash(password , 10)

    const users = await UserModel.create({
        name,
        password:hashpassword,
        email,
        number
    })

    const token = jwt.sign({id:users._id} , process.env.SECRET_KEY , {expiresIn : "1h"})

    res.cookie("token" , token)

    res.status(201).json({
        success:true,
        message:"User registered",
        users
    })


}

module.exports = {registercontroller }
