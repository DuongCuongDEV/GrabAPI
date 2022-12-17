"trip strict";

const Trip = function (trip) {
    this.longitude_bat_dau = trip.longitude_bat_dau;
    this.laitude_bat_dau = trip.latitude_bat_dau;
    this.longitude_ket_thuc = trip.longitude_ket_thuc;
    this.laitude_ket_thuc = trip.latitude_ket_thuc;
    this.ma_chuyen = trip.ma_chuyen;
    this.ma_nguoi_dat = trip.ma_nguoi_dat;
};

Trip.gettrips = function (result) {
    connection.query("SELECT * from thong_tin_chuyen_xe inner join thong_tin_nguoi_dung ON thong_tin_chuyen_xe.ma_nguoi_dat = thong_tin_nguoi_dung.ma_nguoi_dung",(err,res) =>  {
        if (err) {
            result(err, null);
          } else {
            result(null, res);
          }
    }  )
};

Trip.displaytrip = function (machuyen, result) {
    connection.query("SELECT * FROM thong_tin_chuyen_xe WHERE ma_chuyen = ? ", [machuyen], (err,res) => {
        if (err) {
            result(err, null);
          } else {
            result(null, res);
          }
    });
};

Trip.update = function (id, trip, result) {
  connection.query("UPDATE thong_tin_chuyen_xe SET ? WHERE ma_chuyen = ?", [trip, id], function (
    err,
    res
  ) {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Trip;
