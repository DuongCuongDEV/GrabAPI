const Tinh = require("../models/layTinh");


exports.docTinh = async(req, res) => {
    Tinh.layRa(function(err, tinh) {
        if (err) {
            return res.status(403).send(err);
        }
        res.json(tinh);
    });
};