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
    connection.query("SELECT longitude_bat_dau,laitude_bat_dau,longitude_ket_thuc,laitude_ket_thuc,ma_chuyen,ma_nguoi_dat,ma_giam_gia,do_dai_quang_duong,thanh_tien from thong_tin_chuyen_xe",(err,res) =>  {
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
