const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const connection = require("./database/mysqlDatabase");

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// database init
function mysqlConnect() {
    global.connection = mysql.createConnection(connection);

    global.connection.connect(function(err) {
        if (err) {
            console.log("error when connecting to db");
            setTimeout(mysqlConnect, 2000);
        }
        console.log("connected to database");
    });
    global.connection.on("error", function(err) {
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            mysqlConnect();
        } else {
            throw err;
        }
    });
}

mysqlConnect();

// Routes
const tinhRoutes = require("./routes/layTinh");
const huyenRoutes = require("./routes/layHuyen");
const xaRoutes = require("./routes/layXa");
const thongTinNguoiDung = require("./routes/dangKy");
const thongTinTaiKhoanRoutes = require("./routes/thongTinTaiKhoan");
const sendEmailRoutes = require("./routes/sendEmail");
const dangnhap = require("./routes/dangnhap");
const trangthai = require("./routes/trangthai");
const changePasswordRoutes = require("./routes/changePassword");




// Routes
app.use("/api", tinhRoutes);
app.use("/api", huyenRoutes);
app.use("/api", xaRoutes);
app.use("/api", thongTinNguoiDung)

app.use("/api", dangnhap);
app.use("/api", trangthai);
//API tạo thông tin tài khoản phần đăng nhập
app.use("/thongTinTaiKhoan", thongTinTaiKhoanRoutes);

//API quên mật khẩu 
app.use("/sendEmail", sendEmailRoutes);

//API đổi mật khẩu
app.use("/changePassword", changePasswordRoutes);


// PORT
const port = process.env.PORT || 3000;

// Starting a server
app.listen(port, () => {
    console.log(`app is running at ${port}`);
});