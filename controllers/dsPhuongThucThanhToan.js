const API = require("../models/dsPhuongThucThanhToan");
const phuongThucThanhToan = API.phuongThucThanhToan;


exports.readPTTT = async (req, res) => {
    phuongThucThanhToan.read(function (err, pttt) {
        if (err) {
            return res.status(403).send(err);
        }
        res.json(pttt);
    });
};