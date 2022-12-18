const express = require("express");
const router = express.Router();
const {readPTTT} = require("../controllers/dsPhuongThucThanhToan");

router.get("/phuong_thuc_thanh_toan", readPTTT);

module.exports = router;