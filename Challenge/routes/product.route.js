const express = require ("express");
const { productController } = require("../controller/product.controller");

const router = express.Router();

router.post("/product" ,productController)

module.exports = router;