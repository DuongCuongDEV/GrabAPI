const express = require("express");
const router = express.Router();
const {
  createSendEmail
} = require("../controllers/sendEmail");

router.post("/", createSendEmail); 

module.exports = router;