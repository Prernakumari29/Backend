const nodemailer = require("nodemailer")

const transport = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PASS
    }
})

const sendEmailTo = async(to, subject, html) =>{

    let options = {
        from:process.env.EMAIL,
        to,
        subject,
        html
    }

    return await transport.sendMail(options)
}

module.exports = sendEmailTo;
