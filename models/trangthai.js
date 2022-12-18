"trangthai strict";


const TrangThaiTaiKhoan = function(trangThaiTaiKhoan) {
    this.ten_dang_nhap = trangThaiTaiKhoan.ten_dang_nhap;
};

TrangThaiTaiKhoan.trangThaiTaiKhoan = function(ten_dang_nhap, result) {
    connection.query("SELECT maNguoiDung, ten_trang_thai, tenDangNhap FROM thong_tin_tai_khoan INNER JOIN trang_thai ON thong_tin_tai_khoan.ma_trang_thai = trang_thai.ma_trang_thai WHERE tenDangNhap = ?", [ten_dang_nhap], function(err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};


module.exports = TrangThaiTaiKhoan;