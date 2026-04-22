const { UserModel } = require("../module/user.module");


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

module.exports = {productController};