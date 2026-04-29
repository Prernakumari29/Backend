const dotenv = require("dotenv")
dotenv.config();
const express = require ("express");
const connectdb = require("./config/db");

const app = express();
connectdb();

app.post("/get-image" , (req,res)=>{
  res.send("image mil gyi bhaiyooo")
})

const port = process.env.PORT || 4000
app.listen(3000 , ()=>{
    console.log(`Server is running on the port ${port}`)
})