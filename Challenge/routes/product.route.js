const express = require ("express");
const { productController, multerController } = require("../controller/product.controller");
const adminMiddleware = require("../middleware/adminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../config/multer");

const router = express.Router();

router.post("/product" ,authMiddleware, adminMiddleware ,productController)

router.post("/get-image" , upload.array("images" , 2 ) , multerController)

module.exports = router;