const SendEmail = require("../models/sendEmail");

exports.createSendEmail = async (req, res) => {
    SendEmail.create(req.body.email, (err, sendEmail) => {
        if(err) {
            return res.send(err)
        }
        res.json(sendEmail);
    })
}