const express = require("express");
const router = express.Router();
const {
  updateChangePassword
} = require("../controllers/changePassword");

router.put("/", updateChangePassword); 

module.exports = router;