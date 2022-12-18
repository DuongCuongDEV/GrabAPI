"xa strict";

const Xa = function(xa) {
    this.ma_xa = xa.ma_xa;
    this.ten_xa = xa.ten_xa;
};




Xa.layRa = function(maHuyen, result) {
    connection.query("SELECT `ma_xa`, `ten_xa` FROM xa where ma_huyen = (?)", [maHuyen], function(err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};


module.exports = Xa;