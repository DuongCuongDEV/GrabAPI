const express = require('express');
const { json } = require('express/lib/response');

const mysql = require('mysql2');

const bodyParser = require('body-parser');

const connection = require("./database/mysqlDB");

const app = express()
const port = 3000

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
const thongTinTaiKhoanRoutes = require("./routes/thongTinTaiKhoan");
const sendEmailRoutes = require("./routes/sendEmail");
const changePasswordRoutes = require("./routes/changePassword");


//Để đọc dạng json người dùng nhập vào
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



//API lấy về các tỉnh
app.get('/province ', (req, res) => {
    connection.connect(() => {
        connection.query("SELECT * FROM tinh", (err, ketQuaTinh) => {
            res.send(ketQuaTinh)
        })
    })
})

//API lấy các huyện của một tỉnh nào đấy
app.get('/district', (req, res) => {
    connection.connect(() => {
        connection.query("SELECT * FROM huyen where ma_tinh = (?)", 
            [req.body.maTinh]
        , (err, ketquahuyen) => {
            res.send(ketquahuyen)
        })
    })
})


//API lấy các xã của một huyện nào đấy
app.get('/commune', (req, res) => {
    connection.connect(() => {
        connection.query("SELECT * FROM xa where ma_huyen = (?)", 
            [req.body.maHuyen]
        , (err, ketquaxa) => {
            res.send(ketquaxa)
        })
    })
})

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

//API tạo tài khoản cho người dùng
app.post('/creatAccount', (req, res) => {
    connection.connect(() => {

        //API tạo thông tin người dùng
        connection.query("INSERT INTO `thong_tin_nguoi_dung` (`ho_va_ten`, `anh_dai_dien`, `sdt1`, `sdt2`, `email`, `ma_gioi_tinh`, `ngay_sinh`, `dia_chi_chi_tiet`, `ma_xa`) VALUES (?)", 
            [req.body.hoVaTen, req.body.anhDaiDien, req.body.sdt1, req.body.sdt2, req.body.email, req.body.maGioiTinh, req.body.ngaySinh, req.body.diaChiChiTiet, req.body.maXa]
        , (err) => {
            res.send("Thêm thành công")
        })

        //API tạo thông tin tài khoản
        connection.query("INSERT INTO `thong_tin_tai_Khoan` (`maNguoiDung`, `maQuyenNguoiDung`, `ngayTao`, `ngayCapNhatCuoi`, `bienSoXe`, `ma_trang_thai`, `maNguoiTao`, `tenDangNhap`, `matKhau`) VALUES (?)", 
            [req.body.maNguoiDung, req.body.maQuyenNguoiDung, req.body.ngayTao, req.body.ngayCapNhatCuoi, req.body.bienSoXe, req.body.ma_trang_thai, req.body.maNguoiTao, req.body.tenDangNhap, req.body.matKhau]
        , (err) => {
            res.send("Thêm tài khoản thành công")
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