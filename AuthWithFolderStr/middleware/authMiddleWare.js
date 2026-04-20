const jwt = require("jsonwebtoken");
const { UserModel } = require("../module/user.model");

let authMiddleWare = async(req , res , next) =>{
    try {
        let token = req.cookies.token;

        if(!token){
           return  res.status(404).json({
                message : "token not foune"
            })
        }

        let decode = jwt.verify(token , process.env.SECRET_KEY)
        if(!decode){
              return res.status(400).json({
                message : "Invalid token"
              })
        }

        let user = await UserModel.findById(decode.id)

        if(!user){
           return  res.status(404).json({
                message:"User Not Found"
            })
        }

        req.user = user
        next();


        
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error
        })
    }
}

module.exports = {authMiddleWare}