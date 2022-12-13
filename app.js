const express = require('express');
const { json } = require('express/lib/response');

const mysql = require('mysql2');

const bodyParser = require('body-parser');

const connection = require("./database/mysqlDB");
require("dotenv").config();
const app = express()
const port = process.env.PORT || 3000;

// database init
function mysqlConnect() {
  global.connection = mysql.createConnection(connection);

  global.connection.connect(function (err) {
    if (err) {
      console.log("error when connecting to db");
      setTimeout(mysqlConnect, 2000);
    }
    console.log("connected to database");
  });
  global.connection.on("error", function (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      mysqlConnect();
    } else {
      throw err;
    }
  });
}
  
mysqlConnect();

//Routes
const tinhRoutes = require("./routes/layTinh");
const huyenRoutes = require("./routes/layHuyen");
const xaRoutes = require("./routes/layXa");
const thongTinNguoiDung = require("./routes/dangKy");
const thongTinTaiKhoanRoutes = require("./routes/thongTinTaiKhoan");
const sendEmailRoutes = require("./routes/sendEmail");
const changePasswordRoutes = require("./routes/changePassword");

//Để đọc dạng json người dùng nhập vào
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", tinhRoutes);
app.use("/api", huyenRoutes);
app.use("/api", xaRoutes);
app.use("/api", thongTinNguoiDung)

//API check xem số điện thoại đấy tồn tại chưa
app.get('/checkPhoneNumber', (req, res) => {
    connection.connect(() => {
        connection.query("SELECT * FROM thong_tin_tai_khoan where tenDangNhap = (?)", 
            [req.body.tenDangNhap]
        , (err, thongtintaikhoan) => {
            res.send(thongtintaikhoan)
        })
    })
})

//API lấy thông tin người dùng qua thông tin tài khoản
app.get('/userInformation', (req, res) => {
    connection.connect(() => {
        connection.query("SELECT * FROM thong_tin_nguoi_dung where ma_nguoi_dung = (?)", 
            [req.body.maNguoiDung]
        , (err, thongtinnguoidung) => {
            res.send(thongtinnguoidung)
        })
    })
})


//API tạo thông tin tài khoản phần đăng nhập
app.use("/thongTinTaiKhoan", thongTinTaiKhoanRoutes);

//API quên mật khẩu 
app.use("/sendEmail", sendEmailRoutes);

//API đổi mật khẩu
app.use("/changePassword", changePasswordRoutes);



//Mở một cổng 3000 để chạy
app.listen(port, () => {
    console.log(`Ban dang o cong: ${port}`)
})





