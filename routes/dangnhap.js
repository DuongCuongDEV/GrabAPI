const express = require("express");
const router = express.Router();
const {
    dangNhapTaiKhoan,
} = require("../controllers/dangnhap");

router.get("/dangNhap", dangNhapTaiKhoan);

module.exports = router;