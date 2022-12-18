const DangKy = require("../models/dangKy");

exports.taoTaiKhoan = async(req, res) => {
    if (!req.body.ho_va_ten || !req.body.dia_chi_chi_tiet || !req.body.email || !req.body.ma_xa) {
        return res.status(422).json({
            ho_va_ten: "firstname is required",
            dia_chi_chi_tiet: "firstname is required",
            email: "email is required",

        });
    }

    const dangKy = new DangKy(req.body);
    DangKy.taoMoi(dangKy, function(err, dangKy) {
        if (err) {
            return res.status(403).send(err);
        }
        res.json(dangKy);
    });
};