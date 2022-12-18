const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const connection = require("./database/mysqlDB");
const app = express();

function mysqlConect() {
    global.connection = mysql.createConnection(connection);
    global.connection.connect(function(err) {
        if (err) {
            console.log("Loi ket noi db");
            setTimeout(mysqlConect, 2000);
        }
        console.log("Da ket noi db");
    });

    global.connection.on("error", function(err) {
        if (err.code == "PROTOCOL_CONNECTION_LOST") {
            mysqlConect();
        } else {
            throw err;
        }
    });
}
mysqlConect();

//routes

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



// Middlewares
app.use(bodyParser.json());
app.use(cors());

//routes
app.use("/grab", RouterUudai);
app.use("/grab", RouterPTTT);
app.use("/grab", RouterDanhSachDiaDiem);

app.use("/api", datChuyenRoutes);
app.use("/api", dsLoaiPhuongTienRoutes);
app.use("/api", dsPhuongThucThanhToanRoutes);
app.use("/api", soDuRoutes);






// Routes
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