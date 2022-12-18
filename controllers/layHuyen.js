const Huyen = require("../models/layHuyen");


exports.docHuyen = async(req, res) => {
    const maTinh = req.body.maTinh;

    Huyen.layRa(maTinh, function(err, huyen) {
        if (err) {
            return res.status(403).send(err);
        }
        res.json(huyen);
    });
};