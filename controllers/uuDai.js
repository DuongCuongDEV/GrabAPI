const uuDai = require("../models/uuDai");


exports.createUuDai = async(req, res) => {
    if (!req.body.ma_uu_dai || !req.body.ten_uu_dai || !req.body.so_tien_giam) {
        return res.status(422).json({
            ma_uu_dai: "Khong duoc de trong ma uu dai",
            ten_uu_dai: "Khong duoc de trong",
            so_tien_giam: "Khog duoc de trong",
        });
    }
    const uudai = new uuDai(req.body);
    uuDai.create(uudai, function(err, uudai) {
        if (err) {
            return res.status(403).send(err);
        }
        res.json(uudai);
    });
};

exports.readUuDai = async(req, res) => {
    uuDai.read(function(err, uudai) {
        if (err) {
            return res.status(403).send(err);
        }
        res.json(uudai);
    });
};

exports.updateUuDai = async(req, res) => {
    const ma_uu_dai = req.params.ma_uu_dai;
    uuDai.update(ma_uu_dai, new uuDai(req.body), function(err, uudai) {
        if (err) {
            return res.status(403).send(err);
        }
        res.json(uudai);
    });
};

exports.deleteUuDai = async(req, res) => {
    const ma_uu_dai = req.params.ma_uu_dai;
    uuDai.delete(ma_uu_dai, function(err, uudai) {
        if (err) {
            return res.status(403).send(err);
        }
        res.json(uudai);
    });
};


exports.searchUuDai = async(req, res) => {
    let key = req.params.key;
    console.log("key la:" + key);
    uuDai.search(key, function(err, uudai) {
        if (err) {
            return res.status(403).send(err);
        }
        res.json(uudai);
    });
};