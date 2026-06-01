const express = require("express");
const {registerController , loginController, getAccessTokenController , logOutController} = require("../controller/user.controller");
const ApiResponse = require("../utils/apiResponse");
let authMiddleware = require("../middleware/auth.middleware")


const router = express.Router();

router.get("/me" , authMiddleware ,(req,res)=>{
    return res.status(200).json(new ApiResponse("loggedIn User" , req.user ))

})

router.post("/register" , registerController)
router.post("/login" , loginController )
router.get("/getAccessToken" , getAccessTokenController)
router.post("/logout" , authMiddleware , logOutController)


module.exports = router;