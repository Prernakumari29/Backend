const Imagekit = require("imagekit")

const storageInstance = new Imagekit({
    publicKey:process.env.PUBLIC_Key,
    privateKey:process.env.PRIVATE_KEY,
    urlEndpoint:process.env.URL_ENDPOINT
})

const SendToImage = async (file , fileName)=>{
  let options ={
    file ,
    fileName
  }

  return await storageInstance.upload(options)
}

module.exports = SendToImage;