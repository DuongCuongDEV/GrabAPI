const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const connection = require("./database/mysqlDB");

const app = express();

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

const tripRoutes = require("./routes/trip");
const accRoutes = require("./routes/nguoidung");
const tinhRoutes = require("./routes/layTinh");
const huyenRoutes = require("./routes/layHuyen");
const xaRoutes = require("./routes/layXa");
const thongTinNguoiDung = require("./routes/dangKy");
const RouterUudai = require("./routes/uuDai");
const RouterPTTT = require("./routes/phuongThucThanhToan");
const RouterDanhSachDiaDiem = require("./routes/diaDiem");

const datChuyenRoutes = require("./routes/datChuyen");
const dsLoaiPhuongTienRoutes = require("./routes/dsLoaiPhuongTien");
const dsPhuongThucThanhToanRoutes = require("./routes/dsPhuongThucThanhToan");
const soDuRoutes = require("./routes/soDu");

app.use(bodyParser.json());
app.use(cors());
app.use("/api", tripRoutes);
app.use("/api", accRoutes);
app.use("/grab", RouterUudai);
app.use("/grab", RouterPTTT);
app.use("/grab", RouterDanhSachDiaDiem);

app.use("/api", datChuyenRoutes);
app.use("/api", dsLoaiPhuongTienRoutes);
app.use("/api", dsPhuongThucThanhToanRoutes);
app.use("/api", soDuRoutes);

app.use("/api", tinhRoutes);
app.use("/api", huyenRoutes);
app.use("/api", xaRoutes);
app.use("/api", thongTinNguoiDung)



// PORT
const port = process.env.PORT || 3000;

// Starting a server
app.listen(port, () => {
    console.log(`app is running at ${port}`);
});