const Xa = require("../models/layXa");


exports.docXa = async(req, res) => {
    const maHuyen = req.body.maHuyen;

    Xa.layRa(maHuyen, function(err, xa) {
        if (err) {
            return res.status(403).send(err);
        }
        res.json(xa);
    });
};