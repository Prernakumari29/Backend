const express = require("express");
const { registercontroller } = require("../controler/auth.controler");


const router = express.Router();

router.post("/register" , registercontroller)

module.exports = router