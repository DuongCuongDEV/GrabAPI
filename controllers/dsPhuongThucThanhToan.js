const phuongThucThanhToan = require("../models/dsPhuongThucThanhToan");

exports.readPTTT = async (req, res) => {
    phuongThucThanhToan.read(function (err, pttt) {
        if (err) {
            return res.status(403).send(err);
        }
        res.json(pttt);
    });
};