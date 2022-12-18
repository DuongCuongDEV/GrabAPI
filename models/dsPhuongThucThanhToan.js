//Danh sach phuong thuc thanh toan
const phuongThucThanhToan = function(pttt) {
    this.maPTTT = pttt.maPTTT;
    this.tenPTTT = pttt.tenPTTT
};

phuongThucThanhToan.read = function (result) {
    connection.query("SELECT ten_phuong_thuc_thanh_toan FROM phuong_thuc_thanh_toan", (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

module.exports = phuongThucThanhToan;
