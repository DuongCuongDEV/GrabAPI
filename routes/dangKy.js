const express = require("express");
const router = express.Router();
const {
    taoTaiKhoan,

} = require("../controllers/dangKy");

router.post("/thongTinNguoiDung", taoTaiKhoan); //Tạo một user mới


module.exports = router;