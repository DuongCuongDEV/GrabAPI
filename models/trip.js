const Trip = function (trip) {
    this.longtitude_bat_dau = trip.longtitude_bat_dau;
    this.latitude_bat_dau = trip.latitude_bat_dau;
    this.longtitude_ket_thuc = trip.longtitude_ket_thuc;
    this.latitude_ket_thuc = trip.latitude_ket_thuc;
    this.ma_chuyen = trip.ma_chuyen;
    this.ma_nguoi_dat = trip.ma_nguoi_dat;
};

Trip.gettrips = function (maloaiphuongtien, result) {
    connection.query("SELECT longtitude_bat_dau,latitude_bat_dau,longtitude_ket_thuc,latitude_ket_thuc,ma_chuyen,ma_nguoi_dat from thong_tin_chuyen_xe inner WHERE ma_loai_phuong_tien = (?) ",[maloaiphuongtien],(err,res) =>  {
        if (err) {
            result(err, null);
          } else {
            result(null, res);
          }
    }  )
};

Trip.displaytrip = function (machuyen, result) {
    connection.query("SELECT * FROM thong_tin_chuyen_xe WHERE ma_chuyen = (?) ", [machuyen], (err,res) => {
        if (err) {
            result(err, null);
          } else {
            result(null, res);
          }
    });
};

module.exports = Trip;