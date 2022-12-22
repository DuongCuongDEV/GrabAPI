const Taikhoan = require("../models/nguoidung");


exports.hienThi = async (req, res) => {
    Taikhoan.hienthi(req.params.manguoidung, function(err, trip) {
        if (err) {
            return res.status(403).send(err);
        }
        res.json(trip);
    } );
};

