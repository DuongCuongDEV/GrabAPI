const express = require("express");
const router = express.Router();

const {
  readDanhSachDiaDiem,
  searchDiaChi
} = require("../controllers/diaDiem");

router.get("/diachi", readDanhSachDiaDiem);
router.get("/diachi/:key", searchDiaChi);


module.exports = router;