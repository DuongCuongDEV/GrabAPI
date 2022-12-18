//Hien thi thong tin phuong tien, tai xe nhan chuyen + dat chuyen
const chuyenXe = function(chuyen) {
    this.ma_chuyen = chuyen.ma_chuyen;
    this.ma_nguoi_dat = chuyen. ma_nguoi_dat;
    this.ma_tai_xe = chuyen.ma_tai_xe;
    this.ma_trang_thai_chuyen_di = chuyen.ma_trang_thai_chuyen_di;
    this.longitude_bat_dau = chuyen.longitude_bat_dau;
    this.laitude_bat_dau = chuyen.laitude_bat_dau;
    this.longitude_ket_thuc = chuyen.longitude_ket_thuc;
    this.laitude_ket_thuc = chuyen.laitude_ket_thuc;
    this.thanh_tien = chuyen.thanh_tien;
    this.ma_giam_gia = chuyen.ma_giam_gia;
    this.thoi_gian_dat = new Date();
    this.thoi_gian_hoan_thanh = new Date();
    this.ghi_chu = chuyen.ghi_chu;
};


chuyenXe.create = function (chuyen, result) {    //Dat chuyen
    connection.query("INSERT INTO thong_tin_chuyen_xe set ?", chuyen, function (err, res) {
        if (err) {
          result(err, null);
        } else {
          result(null, res.insertId);
        }
    });
};

chuyenXe.read = function (maChuyen, result) {    //Hien thi thong tin tai xe nhan chuyen + phuong tien
  connection.query("SELECT ho_va_ten, anh_dai_dien, sdt1, sdt2, bien_so_xe, ten_hang_xe FROM thong_tin_chuyen_xe INNER JOIN thong_tin_nguoi_dung ON thong_tin_chuyen_xe.ma_tai_xe = thong_tin_nguoi_dung.ma_nguoi_dung INNER JOIN phuong_tien_nguoi_dung ON phuong_tien_nguoi_dung.ma_nguoi_dung = thong_tin_nguoi_dung.ma_nguoi_dung INNER JOIN hang_xe ON phuong_tien_nguoi_dung.ma_hang_xe = hang_xe.ma_hang_xe WHERE ma_chuyen = ?", maChuyen, (err, res) => {
      if (err) {
          result(err, null);
      } else {
          result(null, res);
      }
  });
};

module.exports = chuyenXe;
