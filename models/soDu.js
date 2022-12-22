//Hien thi so du
const taiKhoanNganHang = function(tknh) {
    this.soTaiKhoan = tknh.soTaiKhoan;
    this.usernameLK = tknh.usernameLK;
    this.maNganHang = tknh.maNganHang;
    this.tenChuTaiKhoan = tknh.tenChuTaiKhoan;
    this.soDu = tknh.soDu;
};

taiKhoanNganHang.read = function(username, result) {
    connection.query("SELECT so_du, so_tai_khoan, ten_ngan_hang, ten_chu_tai_khoan FROM tai_khoan_ngan_hang_lien_ket INNER JOIN ngan_hang ON tai_khoan_ngan_hang_lien_ket.ma_ngan_hang = ngan_hang.ma_ngan_hang WHERE username_lien_ket = ?",  username, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

module.exports = taiKhoanNganHang;
