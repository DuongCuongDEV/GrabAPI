const express = require("express");
const router = express.Router();
const {
    docHuyen,
} = require("../controllers/layHuyen");

router.get("/huyen", docHuyen); //Lấy ra danh sách

module.exports = router;