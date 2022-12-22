const diaDiem = require("../models/diaDiem");

exports.readDanhSachDiaDiem = async(req, res) => {
  diaDiem.read(function(err, danhsachdiaddiem) {
    if(err) {
      return res.status(403).send(err);
    }
    res.json(danhsachdiaddiem);
  });
};

exports.searchDiaChi = async(req, res) => {
  let key = req.params.key;
  console.log("key:" + key);
  diaDiem.search(key, function(err, diadiem) {
    if(err) {
      return res.status(403).send(err);
    } 
    res.json(diadiem);
  });
};