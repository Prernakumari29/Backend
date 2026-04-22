const express = require ("express")
const { connectdb } = require("./config/db")

const proRoute = require("./routes/product.route")


const app = express ()

app.use(express.json())
connectdb()

app.use("/api/pro" , proRoute )



app.listen(3000 , ()=>{
    console.log("server is running on the port 3000")
})