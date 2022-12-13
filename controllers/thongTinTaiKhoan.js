const ThongTinTaiKhoan = require("../models/thongTinTaiKhoan");

exports.readThongTinTaiKhoan = async (req, res) => {
    ThongTinTaiKhoan.read(req.body, (err, thongTinTaiKhoan) => {
        if(err) {
            return res.send(err)
        }
        res.json(thongTinTaiKhoan);
    })
}