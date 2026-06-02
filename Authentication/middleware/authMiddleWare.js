const jwt = require("jsonwebtoken")
const { UserModel } = require("../models/user.model")
const cacheInstance = require("../config/cacheInstance")

let authMiddleWare = async(req,res ,next)=>{
    try {
        
        let token = req.cookies?.token
    if(!token){
        return res.status(404).json({
            message : "token not found"
        })
    }

    let isblacklisted = await cacheInstance.get(token);

    if(isblacklisted){
        return res.status(401).json({
            message:"mt kr laadle"
        })
    }

    let decode = jwt.verify(token , process.env.JWT_SECRET_KEY )
    if(!decode){
        return res.json({
            message: "Invalid token"
        })
    }

    let user = await UserModel.findById(decode.id)

    if(!user){
        return res.json({
            message : "user Not found"
        })
    }

    req.user = user
    next();
    } catch (error) {
        return res.status(500).json({
            message : "Internal Server error",
            error
        })
    }
}

module.exports = {authMiddleWare}