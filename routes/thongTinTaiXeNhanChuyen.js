const express = require("express");
const router = express.Router();
const readChuyenXe = require("../controllers/thongTinTaiXeNhanChuyen");

router.get("/thong_tin_chuyen_xe/:idChuyen", readChuyenXe);

module.exports = router;