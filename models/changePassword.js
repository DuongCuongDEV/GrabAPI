"changePassword strict";

const ChangePassword = function (changePassword) {
  this.matKhauMoi = changePassword.matKhauMoi;
  this.nhapLaiMatKhauMoi = changePassword.nhapLaiMatKhauMoi;
  this.tenDangNhap = changePassword.tenDangNhap;
};

ChangePassword.update = function (changePassword, result) {
    if(changePassword.matKhauMoi == changePassword.nhapLaiMatKhauMoi) {
        connection.query("UPDATE thong_tin_tai_khoan SET matKhau = (?) where tenDangNhap = (?)", [changePassword.matKhauMoi, changePassword.tenDangNhap], (err,res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, "Thay đổi mật khẩu thành công")
            }
            
        })
    } else {
        result("Pass not match!!", null)
    }
};


module.exports = ChangePassword;