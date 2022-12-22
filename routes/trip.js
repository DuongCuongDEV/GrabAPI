const express = require("express");
const router = express.Router();
const {
    getTrips,
    displayTrip,
    updateTrip,
} = require("../controller/trip");

router.get("/trips", getTrips);
router.get("/trips/:machuyen", displayTrip);
router.put("/trips/:machuyen", updateTrip);

module.exports = router;