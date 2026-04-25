const express = require ("express");
const { productController } = require("../controller/product.controller");
const adminMiddleware = require("../middleware/adminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/product" ,authMiddleware, adminMiddleware ,productController)

module.exports = router;