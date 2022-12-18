const express = require("express");
const router = express.Router();
const {readLoaiPhuongTien} = require("../controllers/dsLoaiPhuongTien");

router.get("/loai_phuong_tien", readLoaiPhuongTien);

module.exports = router;