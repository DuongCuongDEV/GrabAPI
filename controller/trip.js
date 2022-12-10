const Trip = require("../models/trip");

exports.getTrips = async (req, res) => {
    Trip.gettrips(req.body.maloaixe, function(err, trip) {
        if (err) {
            return res.status(403).send(err);
        }
        res.json(trip);
    } );
};

exports.displayTrip = async (req, res) => {
    Trip.displaytrip(req.body.machuyen, function(err, trip) {
        if (err) {
            return res.status(403).send(err);
        }
        res.json(trip);
    } );
};

