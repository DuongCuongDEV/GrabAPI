const taiKhoanNganHang = require("../models/soDu");

exports.readTKNH = async (req, res) => {
    const id = req.params.usernameLK;
    taiKhoanNganHang.read(id, function (err, tknh) {
        if (err) {
            return res.status(403).send(err);
        }
        res.json(tknh);
    });
};
