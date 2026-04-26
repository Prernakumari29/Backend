const express = require ("express");
const { productController } = require("../controller/product.controller");
const adminMiddleware = require("../middleware/adminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../config/multer");

const router = express.Router();

router.post("/product" ,authMiddleware, adminMiddleware ,productController)

router.post("/get-image" , upload.array("images" , 2) ,(req,res)=>{
    let data = req.files
    console.log(data)
    res.send("image mil gyi..")

})

module.exports = router;