const ChangePassword = require("../models/changePassword");

exports.updateChangePassword = async (req, res) => {
    const changePassword = new ChangePassword(req.body);
    ChangePassword.update(changePassword, (err, changePassword) => {
        if(err) {
            return res.send(err)
        }
        res.json(changePassword);
    })
}