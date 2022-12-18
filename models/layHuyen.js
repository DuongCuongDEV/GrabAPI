"huyen strict";

const Huyen = function(huyen) {
    this.ma_huyen = huyen.ma_huyen;
    this.ten_huyen = huyen.ten_huyen;
};




Huyen.layRa = function(maTinh, result) {
    connection.query("SELECT `ma_huyen`, `ten_huyen` FROM huyen where ma_tinh = (?)", [maTinh], function(err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};


module.exports = Huyen;