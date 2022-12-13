"tinh strict";

const Tinh = function(tinh) {
    this.ma_tinh = tinh.ma_tinh;
    this.ten_tinh = tinh.ten_tinh;
};




Tinh.layRa = function(result) {
    connection.query("SELECT * FROM tinh", (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};


module.exports = Tinh;