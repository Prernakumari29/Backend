const doten = require("dotenv")
doten.config();
const express = require("express");
const upload = require("./config/multer");
const SendToImage = require("./service/storage.service");

const app = express();

app.post("/get-image" , upload.single("image") , async (req, res)=>{
    try {

        let data = req.file

        if(!data){
            return res.status(404).json({
                message:"file not found"
            })
        }

        const uploadImage = await SendToImage(data.buffer , data.originalname)
        console.log(uploadImage)

        return res.status(201).json({
            message:"Image uploaded succesfully"
        })


    } catch (error) {
        return res.status(500).json({
            message:"Somrthing went wrong"
        })
    }


})

let port = process.env.PORT || 4000
app.listen(port , ()=>{
    console.log(`server is running on the port ${port}`)
})