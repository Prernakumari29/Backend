const UserModel = require("../model/user.model");
const ApiError = require("../utils/apiError");
const asynchandler = require("../utils/asyncHandler");
let jwt = require("jsonwebtoken")

let authMiddleware = asynchandler(async(req ,res, next) =>{

    let accessToken = req.cookies.accesstoken;

    if(!accessToken){
        throw new ApiError(401, "unauthorized")
    }

    let decode = jwt.verify(accessToken , process.env.ACCESS_TOKEN)

    let user = await UserModel.findById(decode.id)

    if(!user){
        throw new ApiError(404 , "user not found")
    }

    req.user = user;
    next()

})

module.exports = authMiddleware;