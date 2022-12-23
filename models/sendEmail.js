"sendEmail strict";
require("dotenv").config()
const nodemailer = require("nodemailer");
const user = {
    email: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
}
const SendEmail = function(sendEmail) {
    this.email = sendEmail.email
}


SendEmail.create = function(email, result) {
    connection.connect(() => {
        async function sendMessage() {
            var randomNumber = Math.floor(Math.random() * 1000000) + 1

            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                service: 'gmail',
                port: "465",
                secure: true,
                pool: false,
                auth: {
                    user: user.email,
                    pass: user.pass
                }
            })
            let mailOptions = {
                from: '"Grab" no-reply@gmail.com',
                to: `${email}`,
                subject: 'Sending message from Grab',
                text: 'Hello',
                html: `<h2>Mật khẩu mới của bạn là: </h2><br><h3>${randomNumber}</h3>`
            }
            await transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error)
                    result(error, null);
                } else {
                    console.log('Email sent: ' + info.response)
                    result(null, "send success!!");
                }
            })
            transporter.close();
        }
        sendMessage();
    })
}

module.exports = SendEmail;