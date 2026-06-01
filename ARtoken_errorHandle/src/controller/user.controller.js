const UserModel = require("../model/user.model")
const bcrypt = require("bcrypt")
const ApiError = require("../utils/apiError")
const ApiResponse = require("../utils/apiResponse")
const asynchandler = require("../utils/asyncHandler")
const {registerService , loginService, getAccessToken} = require("../services/auth.service")

const registerController = asynchandler(async (req, res)=>{
   

        let {accessToken,refreshToken,newUser} = await registerService(req.body)

        res.cookie("accesstoken" , accessToken, {
            httpOnly:true,
            sameSite:"lax",
            secure:false,
            maxAge:15*60*1000,
        })

        res.cookie("refreshToken" , refreshToken , {
            httpOnly:true,
            sameSite:"lax",
            secure:false,
            maxAge: 24 * 60 * 60 * 1000,
        })

        

        return res
        .status(201)
        .json(new ApiResponse("user created successfully", newUser))

        
     
})

const loginController = asynchandler(async(req , res) =>{

    let {accessToken ,refreshToken , isExisted} = await loginService(req.body);

     res.cookie("accesstoken" , accessToken, {
            httpOnly:true,
            sameSite:"lax",
            secure:false,
            maxAge:15*60*1000,
        })

        res.cookie("refreshToken" , refreshToken , {
            httpOnly:true,
            sameSite:"lax",
            secure:false,
            maxAge: 24 * 60 * 60 * 1000,
        })

        

        return res
        .status(200)
        .json(new ApiResponse("user login successfully", isExisted))

})


const getAccessTokenController = asynchandler(async(req , res) => {
    let refreshToken = req.cookies.refreshToken;

    let accessToken = await getAccessToken(refreshToken)

    res.cookie("accesstoken" , accessToken, {
            httpOnly:true,
            sameSite:"lax",
            secure:false,
            maxAge:15*60*1000,
        })

        return res
        .status(200)
        .json(new ApiResponse("acess token generated"))
})

const logOutController = asynchandler( async(req,res)=>{
    await UserModel.findByIdAndUpdate(req.user.id , {refreshToken:null})

    res.clearCookie("accesstoken")
    res.clearCookie("refreshToken")

   return res
   .status(200)
   .json(new ApiResponse("logOut Successfully"))


})

module.exports = {registerController , loginController , getAccessTokenController , logOutController}