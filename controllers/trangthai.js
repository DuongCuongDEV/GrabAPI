const TrangThaiTaiKhoan = require("../models/trangthai");

exports.trangThaiTaiKhoan = async(req, res) => {
    if (!req.body.ten_dang_nhap) {
        return res.status(422).json({
            ten_dang_nhap: "required",
        });
    }

    
    const username = req.body.ten_dang_nhap;

    TrangThaiTaiKhoan.trangThaiTaiKhoan(username,function(err, trangThaiTaiKhoan) {
        if (err) {
            return res.status(403).send(err);
        }
        res.json(trangThaiTaiKhoan);
    });
};