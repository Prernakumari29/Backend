const UserModel = require("../model/user.model")
const bcrypt = require("bcrypt")
const ApiError = require("../utils/apiError")
const ApiResponse = require("../utils/apiResponse")
const asynchandler = require("../utils/asyncHandler")

const registerController = asynchandler(async (req, res)=>{
   

        let {name , password , email} = req.body

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

        return res
        .status(201)
        .json(new ApiResponse("user created successfully", newUser))

        
     
})

module.exports = registerController