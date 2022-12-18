const express = require("express");
const router = express.Router();
const {createChuyenXe, readChuyenXe} = require("../controllers/datChuyen");

router.post("/thong_tin_chuyen_xe", createChuyenXe);
router.get("/thong_tin_chuyen_xe/:idChuyen", readChuyenXe);


module.exports = router;