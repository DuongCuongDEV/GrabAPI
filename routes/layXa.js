const express = require("express");
const router = express.Router();
const {
    docXa,
} = require("../controllers/layXa");

router.get("/xa", docXa); //Lấy ra danh sách

module.exports = router;