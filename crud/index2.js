const express  = require("express")
const { connectdb } = require("./config/db");
const { UserModel } = require("./models/user.model");

const app = express()
app.use(express.json())

connectdb();

app.post("/users" , async (req , res)=>{
    let {name ,password , email} = req.body

    if(!name || !password || !email){
        return res.json({
            message : "all fields are required"
        })
    }

     

    // ---------------------------create------------------------------

   let user = await UserModel.create({
        name,
        password,
        email,
    })

    return res.json({
        message:"user data fetched",
        user,
    })

})

app.get("/us/email/:email" , async (req,res)=>{
    try {
         let {email} = req.params

        let person = await UserModel.findOne({email});

        if(!person){
            return res.send ("nhi mila kuch bhi")
        }
            return res.json({
              message : "kuch toh mila",
              person
            })
        
    } catch (error) {
        return res.json({
            message:"Internal Server Error",
            error
        })
    }
})

app.listen(3000 , ()=>{
    console.log("server is running on port 3000")
})