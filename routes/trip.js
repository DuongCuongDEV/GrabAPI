const express = require("express");
const router = express.Router();
const {
    getTrips,
    displayTrip,
} = require("../controller/trip");

router.get("/trips/:maloaixe", getTrips);
router.get("/trip/:machuyen", displayTrip);

module.exports = router;