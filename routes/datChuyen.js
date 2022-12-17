const express = require("express");
const router = express.Router();
const createChuyenXe = require("../controllers/datChuyen");

router.post("/thong_tin_chuyen_xe", createChuyenXe);

module.exports = router;