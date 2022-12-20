const express = require("express");
const router = express.Router();
const {
  readThongTinTaiKhoan
} = require("../controllers/thongTinTaiKhoan");

router.get("/", readThongTinTaiKhoan); 

module.exports = router;