const express = require("express");
const router = express.Router();
const {
    trangThaiTaiKhoan,
} = require("../controllers/trangthai");

router.get("/trangthai", trangThaiTaiKhoan);

module.exports = router;