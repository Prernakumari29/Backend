const jwt = require("jsonwebtoken")

let generateAccessToken = (userId)=>{
    return jwt.sign({id:userId}, process.env.ACCESS_TOKEN , {expiresIn:"15m"})
}

let generateRefreshToken = (userId)=>{
    return jwt.sign({id:userId}, process.env.REFRESH_TOKEN , {expiresIn:"1d"})
}

module.exports = {generateAccessToken , generateRefreshToken}