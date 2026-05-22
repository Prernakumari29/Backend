const sendEmailTo = require("../sevices/mail.service");


const registerUser = async(req,res)=>{

    await sendEmailTo(
        "riyajaiz541@gmail.com",
        "welcome",
        "<h1>you are selected in BLINKIT</h1>"
    )

    res.send("mail send successfully")
}

module.exports = registerUser
