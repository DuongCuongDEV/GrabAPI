"dangKy strict";

const DangKy = function(dangKy) {
    this.ho_va_ten = dangKy.ho_va_ten;
    this.anh_dai_dien = dangKy.anh_dai_dien;
    this.sdt1 = dangKy.sdt1;
    this.sdt2 = dangKy.sdt2;
    this.email = dangKy.email;
    this.ma_gioi_tinh = dangKy.ma_gioi_tinh;
    this.ngay_sinh = dangKy.ngay_sinh;
    this.dia_chi_chi_tiet = dangKy.dia_chi_chi_tiet;
    this.ma_xa = dangKy.ma_xa;

    this.maQuyenNguoiDung = dangKy.maQuyenNguoiDung;
    this.ngayTao = dangKy.ngayTao;
    this.ngayCapNhatCuoi = dangKy.ngayCapNhatCuoi;
    this.bienSoXe = dangKy.bienSoXe;
    this.ma_trang_thai = dangKy.ma_trang_thai;
    this.maNguoiTao = dangKy.maNguoiTao;
    this.matKhau = dangKy.matKhau;
};



DangKy.taoMoi = function(dangKy, result) {
    connection.query("INSERT INTO thong_tin_nguoi_dung (`ho_va_ten`, `anh_dai_dien`, `sdt1`, `sdt2`, `email`, `ma_gioi_tinh`, `ngay_sinh`, `dia_chi_chi_tiet`, `ma_xa`) value (?)", [
        [dangKy.ho_va_ten, dangKy.anh_dai_dien, dangKy.sdt1, dangKy.sdt2, dangKy.email, dangKy.ma_gioi_tinh, dangKy.ngay_sinh, dangKy.dia_chi_chi_tiet, dangKy.ma_xa]
    ], function(err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res.insertId);
        }
        let maND = -1
        let emailND = ""

        connection.query("select ma_nguoi_dung, email from thong_tin_nguoi_dung order by ma_nguoi_dung desc limit 1", (err, kq) => {
            maND = kq[0].ma_nguoi_dung
            emailND = kq[0].email


            connection.query("INSERT INTO `thong_tin_tai_Khoan` (`maNguoiDung`, `maQuyenNguoiDung`, `ngayTao`, `ngayCapNhatCuoi`, `bienSoXe`, `ma_trang_thai`, `maNguoiTao`, `tenDangNhap`, `matKhau`) value (?)", [
                [maND, dangKy.maQuyenNguoiDung, dangKy.ngayTao, dangKy.ngayCapNhatCuoi, dangKy.bienSoXe, dangKy.ma_trang_thai, dangKy.maNguoiTao, emailND, dangKy.matKhau]
            ], (err, res) => {
                console.log("mand", maND)
            })
        })
    });
};



module.exports = DangKy;