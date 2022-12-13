"sendEmail strict";
const nodemailer = require("nodemailer");
const user = {
    email : 'phuongtttph28706@fpt.edu.vn',
    pass: 'baonhi0908@',
}
const SendEmail = function (sendEmail) {
    this.email = sendEmail.email
}

SendEmail.create = function (email, result) {
    connection.connect(() => {
        async function sendMessage() {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: user.email,
                    pass: user.pass
                }
            })
            var mailOptions = {
                from: user.email,
                to: `${email}`,
                subject: 'Sending message from Grab',
                text: 'Hello',
                    html: `<a href="http://facebook.com">Need to reset password</a>`
            }
            await transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error)
                    result(err, null);
                } else {
                    console.log('Email sent: ' + info.response)
                    result(null, "send success!!");
                }
            })
        }
        sendMessage();
    })
}

module.exports = SendEmail;