const DangNhapTaiKhoan = require("../models/dangnhap");

exports.dangNhapTaiKhoan = async(req, res) => {
    console.log("req.body.ten_dang_nhap------>>>", req.body);
    console.log("------>>>");

    console.log("!req.body.mat_khau", req.body.mat_khau);
    if (!req.body.ten_dang_nhap || !req.body.mat_khau) {
        return res.status(422).json({
            ten_dang_nhap: "required",
            mat_khau: "required",
        });
    }


    const dangnhap = new DangNhapTaiKhoan(req.body)


    DangNhapTaiKhoan.dangNhapTaiKhoan(dangnhap, function(err, dangNhapTaiKhoan) {
        if (err) {
            return res.status(403).send(err);
        }
        res.json(dangNhapTaiKhoan);
    });
};