const API = require("../models/thongTinTaiXeNhanChuyen");
const chuyenXe = API.chuyenXe;


exports.readChuyenXe = async (req, res) => {
    const id = req.params.idChuyen;
    chuyenXe.read(id, function (err, chuyen) {
        if (err) {
            return res.status(403).send(err);
        }
        res.json(chuyen);
    });
};
