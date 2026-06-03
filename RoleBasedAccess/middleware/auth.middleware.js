const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken")

const authmiddleware = async(req,res,next)=>{

    let token = req.cookies.token;

    if(!token){
       return res.status(401).json({
            message:"Invalid credentials"
        })
    }

    const decode = jwt.verify(token , "asdfghjklpoiuytrewqxcvbnm")

    const user = await UserModel.findById(decode.id)

    req.user = user;
    next();

}

module.exports = authmiddleware