const API = require("../models/dsLoaiPhuongTien");
const loaiPhuongTien = API.loaiPhuongTien;

exports.readLoaiPhuongTien = async (req, res) => {
    loaiPhuongTien.read(function (err, loaiphuongtien) {
        if (err) {
            return res.status(403).send(err);
        }
        res.json(loaiphuongtien);
    });
};
