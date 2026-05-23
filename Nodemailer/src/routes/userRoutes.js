const express =require("express");
const {registerUser , verifyOtp} = require("../controller/userController");

const router = express.Router();

router.post("/register" , registerUser);
router.post("/verify" , verifyOtp )

module.exports = router;