const DangNhapTaiKhoan = require("../models/dangnhap");

exports.dangNhapTaiKhoan = async(req, res) => {
    if (!req.body.ten_dang_nhap || !req.body.mat_khau) {
        return res.status(422).json({
            ten_dang_nhap: "required",
            mat_khau: "required",
        });
    }

    
    const username = req.body.ten_dang_nhap;
    const mat_khau = req.body.mat_khau;

    DangNhapTaiKhoan.dangNhapTaiKhoan(username, mat_khau, function(err, dangNhapTaiKhoan) {
        if (err) {
            return res.status(403).send(err);
        }
        res.json(dangNhapTaiKhoan);
    });
};