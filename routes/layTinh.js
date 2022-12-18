const express = require("express");
const router = express.Router();
const {
    docTinh,
} = require("../controllers/layTinh");

router.get("/tinh", docTinh); //Lấy ra danh sách

module.exports = router;