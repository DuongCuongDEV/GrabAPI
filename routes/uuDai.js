const express = require("express");
const router = express.Router();

const {
    createUuDai,
    readUuDai,
    updateUuDai,
    deleteUuDai,
    searchUuDai
} = require("../controllers/uuDai");
const connection = require("../database/mysqlDatabase");

router.post("/uudai", createUuDai);
router.get("/uudai", readUuDai);
router.put("/uudai/:ma_uu_dai", updateUuDai);
router.delete("/uudai/:ma_uu_dai", deleteUuDai);

router.get("/uudai/:key", searchUuDai);

module.exports = router;