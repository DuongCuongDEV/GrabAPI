"diaDiem strict";

const diaDiem = function(danhsachdiadiem) {
  this.ten_xa = diaDiem.ten_xa;
  this.ten_huyen = diaDiem.ten_huyen;
  this.ten_tinh = diaDiem.ten_tinh;
};

diaDiem.read = function(kq) {
  connection.query("SELECT ten_xa, ten_huyen, ten_tinh FROM xa INNER JOIN huyen ON xa.ma_huyen = huyen.ma_huyen INNER JOIN tinh ON huyen.ma_tinh = tinh.ma_tinh", (err, res) => {
    if(err) {
      kq(err, null);
    } else {
      kq(null, res);
    }
  });
};

diaDiem.search = function(key, kq) {
  connection.query("SELECT ten_xa, ten_huyen, ten_tinh FROM xa INNER JOIN huyen ON xa.ma_huyen = huyen.ma_huyen INNER JOIN tinh ON huyen.ma_tinh = tinh.ma_tinh WHERE ten_xa LIKE ? ", [['%' + key + '%']], function(err, res) {
    if(err) {
      kq(null, err);
    } else {
      kq(res, null);
    }
  });
};

module.exports = diaDiem;