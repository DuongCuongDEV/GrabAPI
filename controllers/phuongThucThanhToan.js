const phuongThucThanhToan = require("../models/phuongThucThanhToan");

exports.readPhuongThucThanhToan = async(req, res) => {
  phuongThucThanhToan.read(function(err, phuongthucthanhtoan) {
    if(err) {
      return res.status(403).send(err);
    }
    res.json(phuongthucthanhtoan);
  });
};