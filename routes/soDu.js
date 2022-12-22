const express = require("express");
const router = express.Router();
const {readTKNH} = require("../controllers/soDu");

router.get("/tai_khoan_ngan_hang_lien_ket/:usernameLK", readTKNH);

module.exports = router;