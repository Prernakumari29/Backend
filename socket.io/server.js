const express = require("express")
const http = require("http")
const cors = require("cors")
const {Server} = require("socket.io")


const app = express()
app.use(cors())

const httpServer = http.createServer(app)

const io = new Server(httpServer , {
    cors:{
        origin:"http://localhost:5173",
        methods:["GET" ,"POST"]
    }
})

io.on("connection" , (socket)=>{

    socket.on("sender" , (data)=>{
        console.log(data)
    })
})

httpServer.listen(3000,()=>{
    console.log("server is running on the port 3000")
})