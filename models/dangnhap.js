"dangnhap strict";


const DangNhapTaiKhoan = function(dangNhapTaiKhoan) {
    this.ten_dang_nhap = dangNhapTaiKhoan.ten_dang_nhap;
    this.mat_khau = dangNhapTaiKhoan.mat_khau;
};

DangNhapTaiKhoan.dangNhapTaiKhoan = function(ten_dang_nhap,mat_khau, result) {
    connection.query("SELECT tenDangNhap, matKhau FROM thong_tin_tai_Khoan WHERE tenDangNhap  = (?) AND matKhau = (?) ", [ten_dang_nhap,mat_khau], function(err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};


module.exports = DangNhapTaiKhoan;