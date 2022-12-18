//Danh sach phuong tien + gia tien
const loaiPhuongTien = function(loaiphuongtien) {
    this.maLoaiPhuongTien = loaiphuongtien.maLoaiPhuongTien;
    this.tenLoaiPhuongTien = loaiphuongtien.tenLoaiPhuongTien;
    this.heSoGia = loaiphuongtien.heSoGia;
};

loaiPhuongTien.read = function (result) {
    connection.query("SELECT ten_loai_phuong_tien, he_so_gia FROM loai_phuong_tien", (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

module.exports = loaiPhuongTien;
