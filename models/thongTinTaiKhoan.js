"thongTinTaiKhoan strict";

const ThongTinTaiKhoan = function (thongTinTaiKhoan) {
    this.maNguoiDung = thongTinTaiKhoan.maNguoiDung;
    this.maQuyenNguoiDung = thongTinTaiKhoan.maQuyenNguoiDung;
    this.ngayTao = new Date();
    this.ngayCapNhatCuoi = new Date();
    this.bienSoXe = thongTinTaiKhoan.bienSoXe;
    this.ma_trang_thai = thongTinTaiKhoan.ma_trang_thai;
    this.maNguoiTao = thongTinTaiKhoan.maNguoiTao;
    this.tenDangNhap = thongTinTaiKhoan.tenDangNhap;
    this.matKhau = thongTinTaiKhoan.matKhau;
}

ThongTinTaiKhoan.read = function (thongTinTaiKhoan, result) {
    connection.query("SELECT * FROM thong_tin_tai_khoan WHERE tenDangNhap  = (?) AND matKhau = (?) ", [thongTinTaiKhoan.tenDangNhap, thongTinTaiKhoan.matKhau], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

module.exports = ThongTinTaiKhoan;