const OtpModel = require("../models/otp.model");
const sendEmailTo = require("../sevices/mail.service");


const registerUser = async(req,res)=>{

    let {email} = req.body
    const otp = Math.floor(1000 + Math.random()*9000)
    const expiresAt = Date.now() + 1 * 60 * 1000

    await OtpModel.create({
        email,
        otp,
        expiresAt
    })

    // -------------------------------sent email------------------------
    await sendEmailTo(
        email,
        "your prerna app otp is:",
        `<p> your otp is ${otp} </p>`
    )

    res.send("otp send successfully")
}


// ---------------------------verify OTP Controller-----------------------------------------

const verifyOtp =  async (req , res)=>{
    let {email , otp} = req.body
    
    const data = await OtpModel.findOne({email})

    if(!data){
       return res.send("no otp found")
    }

    if(Date.now() > data.expiresAt){
       return res.send("otp expired")
    }

    if(data.otp == otp){
        return res.send("otp verified")
    }

    res.send("Invalid otp")

}

module.exports = {registerUser , verifyOtp}
