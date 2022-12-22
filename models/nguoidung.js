"acc strict";

const Taikhoan = function (taikhoan) {
    this.ma_nguoi_dung = taikhoan.ma_nguoi_dung;
    this.ho_va_ten = this.ho_va_ten;
    this.anh_dai_dien = this.anh_dai_dien
};



Taikhoan.hienthi = function (ma_nguoi_dung, result) {
    connection.query("SELECT ho_va_ten,anh_dai_dien FROM thong_tin_nguoi_dung WHERE ma_nguoi_dung = ? ", [ma_nguoi_dung], (err,res) => {
        if (err) {
            result(err, null);
          } else {
            result(null, res);
          }
    });
};


module.exports = Taikhoan;