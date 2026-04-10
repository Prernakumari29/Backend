const express  = require("express")
const { connectdb } = require("./config/db");
const { UserModel } = require("./models/user.model");
const cors = require ("cors")

const app = express()

app.use(express.json())
app.use(cors({
     origin: "http://localhost:5173",
}))

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
// ----------------------------------------Read------------------------------------------

app.get("/us" , async (req,res)=>{
    try {
        

        let person = await UserModel.find();

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

// ----------------------------------------Update------------------------------------

app.put("/up/update/:id" , async (req,res)=>{

    let {id} = req.params;
    if(!id){
        return res.send("id not found");
    }
    let {name , password ,email} = req.body;

    let updated = await UserModel.findByIdAndUpdate(id , {
       name,
       password,
       email
    },
    {
        new:true
    }   
)

res.json({
        message:"updated succesfully",
        updated
    })
})


// ----------------------------------------------delete----------------------------------------------

app.delete("/del/delete/:id" , async (req,res)=>{
    let {id} =req.params;
    if(!id){
       return res.send("id not found")
    }

    await UserModel.findByIdAndDelete(id)

    return res.json({
        message:"item dleted",

    })
})


app.listen(3000 , ()=>{
    console.log("server is running on port 3000")
})