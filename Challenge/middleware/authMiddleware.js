
const jwt = require("jsonwebtoken")
const UserModel = require("../module/auth.model")

const authMiddleware = async (req , res , next)=>{

    try {
        let token = req.cookies.authToken

        if(!token){
            return res.status(404).json({
                message:"token not found"
            })
        }

        const decode = jwt.verify(token , process.env.SECRET_KEY)

        if(!decode){
            return res.status(401).json({
                message:"Invalid Token"
            })
        }

        const authuser = await UserModel.findById(decode.id)

        req.user = authuser;
        next()
        
    } catch (error) {
       return res.status(500).json({
            message:"Internal Server Error",
            error
        })
    }
}

module.exports = authMiddleware