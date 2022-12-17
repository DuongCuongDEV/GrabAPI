const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const connection = require("./database/mysqlDB");

const app = express();

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

  const tripRoutes = require("./routes/trip");
  const accRoutes = require("./routes/nguoidung");

  app.use(bodyParser.json());
  app.use(cors());
  app.use("/api", tripRoutes);
  app.use("/api",accRoutes);

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`app is running at ${port}`);
  });