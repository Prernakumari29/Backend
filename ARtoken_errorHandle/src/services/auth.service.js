const UserModel = require("../model/user.model")
const bcrypt = require("bcrypt")
const ApiError = require("../utils/apiError");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken");
const jwt = require("jsonwebtoken")

let registerService = async (data)=>{
 
        let {name , password , email } = data;
        if(!password || !email){
            throw new ApiError(400 , "all fields are required")
        }

        let isexisted = await UserModel.findOne({email})
        if(isexisted){
           throw new ApiError(409 , "User already existed")
        }

        let hashpass = await bcrypt.hash(password , 10)

        let newUser = await UserModel.create({
            name,
            password:hashpass,
            email
        })

        let accessToken = generateAccessToken(newUser._id);
        let refreshToken = generateRefreshToken(newUser._id);

        newUser.refreshToken = refreshToken
        await newUser.save();

        return{
            accessToken,
            refreshToken,
            newUser
        }

    
}

let loginService = async(data)=>{
   let {email , password } = data;

   if(!email , !password) {
      throw new ApiError(400 , "all fields are required")
   }

   let isExisted = await UserModel.findOne({email})

   if(!isExisted){
    throw new ApiError(404 , "User not found")
   }

   let accessToken = generateAccessToken(isExisted._id);
    let refreshToken = generateRefreshToken(isExisted._id);

    isExisted.refreshToken = refreshToken
    await isExisted.save();

    return {
        accessToken , refreshToken , isExisted
    }
}

let getAccessToken = async(refreshToken)=>{
    if(!refreshToken) throw new ApiError(401 , "unauthorized");

    let decode = jwt.verify(refreshToken , process.env.REFRESH_TOKEN)

    let user = await UserModel.findById(decode.id)

    if(!user) throw new ApiError(404 , "user not found")

    if(refreshToken !== user.refreshToken) {
        throw new ApiError(401 , "unauthorized request")

        let accessToken = generateAccessToken(user._id);

        return accessToken
    }

}

module.exports = {registerService , loginService , getAccessToken}