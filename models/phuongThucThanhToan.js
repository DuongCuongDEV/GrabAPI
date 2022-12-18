"phuongThucThanhToan strict";

// const connection = require("../database/mysqlDB");

const phuongThucThanhToan = function(phuongthucthanhtoan) {
    this.ten_phuong_thuc_thanh_toan = phuongthucthanhtoan.ten_phuong_thuc_thanh_toan;
};

phuongThucThanhToan.read = function(kq) {
    connection.query("SELECT * FROM phuong_thuc_thanh_toan", (err, res) => {
        if (err) {
            kq(err, null);
        } else {
            kq(null, res);
        }
    });
};
module.exports = phuongThucThanhToan;