"dangnhap strict";


const DangNhapTaiKhoan = function(dangNhapTaiKhoan) {
    this.ten_dang_nhap = dangNhapTaiKhoan.ten_dang_nhap;
    this.mat_khau = dangNhapTaiKhoan.mat_khau;
};

DangNhapTaiKhoan.dangNhapTaiKhoan = function(dangNhapTaiKhoan, result) {
    console.log("dangNhapTaiKhoan", dangNhapTaiKhoan);
    connection.query("SELECT tenDangNhap, matKhau FROM thong_tin_tai_Khoan WHERE tenDangNhap = (?) AND matKhau = (?) ", [
        [dangNhapTaiKhoan.ten_dang_nhap],
        [dangNhapTaiKhoan.mat_khau]
    ], function(err, res) {
        console.log('res', res)

        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};


module.exports = DangNhapTaiKhoan;