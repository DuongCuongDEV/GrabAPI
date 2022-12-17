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

module.exports = {chuyenXe};
