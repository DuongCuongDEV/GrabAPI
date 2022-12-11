"uuDai strict";

// const connection = require("../database/mysqlDB");

// const connection = require("../database/mysqlDB");

// const connection = require("../database/mysqlDB");

const uuDai = function(uudai) {
    this.ma_uu_dai = uudai.ma_uu_dai;
    this.ten_uu_dai = uudai.ten_uu_dai;
    this.so_tien_giam = uudai.so_tien_giam;
};

uuDai.create = function(uudai, ketQua) {
    connection.query("INSERT INTO uu_dai set ?", uudai, function(err, res) {
        if (err) {
            ketQua(err, null);
        } else {
            ketQua(null, res.insertId);
        }
    });
};

uuDai.read = function(ketQua) {
    connection.query("SELECT * FROM uu_dai", (err, res) => {
        if (err) {
            ketQua(err, null);
        } else {
            ketQua(null, res);
        }
    });
};

uuDai.update = function(id, uudai, ketQua) {
    connection.query(
        "UPDATE uu_dai SET ? WHERE ma_uu_dai = ?", [uudai, id],
        function(err, res) {
            if (err) {
                ketQua(null, err);
            } else {
                ketQua(res, null);
            }
        }
    );
};


uuDai.delete = function(id, kq) {
    connection.query("DELETE FROM uu_dai WHERE ma_uu_dai = ?", [id], function(err, res) {
        if (err) {
            kq(null, err);
        } else {
            kq(res, null);
        }
    });
};



uuDai.search = function(key, kq) {
    console.log("Keyyyyy:" + typeof key);
    connection.query("SELECT * FROM uu_dai WHERE ten_uu_dai LIKE ? ", [['%' + key + '%']], function(err, res){
        if(err) {
            kq(null, err);
        } else {
            kq(res, null);
        }
      });
};
module.exports = uuDai;