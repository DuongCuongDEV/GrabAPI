const express = require("express");
const router = express.Router();

const {
  readPhuongThucThanhToan
} = require("../controllers/phuongThucThanhToan");

router.get("/phuongthucthanhtoan", readPhuongThucThanhToan);

module.exports = router;