const express = require("express");
const router = express.Router();
const {
    hienThi
} = require("../controller/nguoidung");

router.get("/acc/:manguoidung", hienThi);


module.exports = router;