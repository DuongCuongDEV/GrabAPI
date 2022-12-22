const chuyenXe = require("../models/datChuyen");

exports.createChuyenXe = async (req, res) => {
    if (!req.body.ma_chuyen || !req.body.ma_nguoi_dat || !req.body.ma_trang_thai_chuyen_di || !req.body.longitude_bat_dau || !req.body.laitude_bat_dau || !req.body.longitude_ket_thuc || !req.body.laitude_ket_thuc || !req.body.thanh_tien || !req.body.thoi_gian_dat) {
        return res.status(422).json({
          warning: "All field required!",
        });
    }
    const chuyen = new chuyenXe(req.body);
    chuyenXe.create(chuyen, function (err, chuyen) {
        if (err) {
          return res.status(403).send(err);
        }
        res.json(chuyen);
    });
};

exports.readChuyenXe = async (req, res) => {
  const id = req.params.idChuyen;
  chuyenXe.read(id, function (err, chuyen) {
      if (err) {
          return res.status(403).send(err);
      }
      res.json(chuyen);
  });
};

