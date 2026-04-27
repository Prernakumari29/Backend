const { UserModel } = require("../module/user.module");
const jwt = require("jsonwebtoken")


const productController =  async (req , res)=>{
   let {pname , ptitle , description , price , category } = req.body;

   if(!pname || !ptitle || !description || !price || !category){
    return res.json({
        message:"Invalid Users"
    })
   }

   const product = await UserModel.create({
    pname,
    ptitle,
    description,
    price,
    category  
   })


   return res.json({
    message : "User Found" ,
    product
   })
   
}

const multerController =   (req,res)=>{
    {
    let data = req.files
    console.log(data)
    res.send("image received")

}

}

module.exports = {productController , multerController};