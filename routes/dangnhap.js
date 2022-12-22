const express = require("express");
const router = express.Router();
const {
    dangNhapTaiKhoan,
} = require("../controllers/dangnhap");

router.post("/dangNhap", dangNhapTaiKhoan);

module.exports = router;