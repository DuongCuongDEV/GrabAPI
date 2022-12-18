const loaiPhuongTien = require("../models/dsLoaiPhuongTien");

exports.readLoaiPhuongTien = async (req, res) => {
    loaiPhuongTien.read(function (err, loaiphuongtien) {
        if (err) {
            return res.status(403).send(err);
        }
        res.json(loaiphuongtien);
    });
};
