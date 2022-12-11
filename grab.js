//b1:import vao thu vien express
const express = require('express')
//b1 import thu vien msql2
const mysql2 = require('mysql2')

//lien quan den insert into
const bodyParser = require('body-parser');

//B2:tao ra ung dung web su dung thu vien express
const app = express()

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
//


//b3: tao ra cong 3000
const port = 3000

//b2 tao databbase
const connection = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Grab'
});





//b4: tao api phuong thuc GET: localhost:3000
app.get('/', (req, res) => {
  res.send('<h1>Xin chao ban</h1>')
})

app.get('/tinh', (req, res) => {
  connection.connect(() => {
    connection.query("SELECT * FROM tinh", (err, ketQuaTinh) => {
      res.send(ketQuaTinh)
    })
  })
})

app.post('/tinh', (req, res) => {
  connection.connect(() => {
    connection.query("INSERT INTO tinh (ma_tinh, ten_tinh) VALUES (?)", [[req.body.ma_tinh, req.body.ten_tinh]], (err) => {
      console.log(err)
      res.send("Them thanh cong")
    })
  })
})

//dat chuyen
// 1: lay ra phuong thuc thanh toan cua nguoi dang nhap vao tai khoan
app.get('/phuongthucthanhtoan', (req, res) => {
  connection.connect(() => {
    connection.query("SELECT * FROM phuong_thuc_thanh_toan", (err, ketQua) => {
      res.send(ketQua);
    })
  })
})

//api danh sach uu dai
app.get('/uudai', (req, res) => {
  connection.connect(() => {
    connection.query("SELECT * FROM uu_dai", (err, ketQua) => {
      res.send(ketQua);
    })
  })
})

//danh sach dia diem
app.get('/danhsachdiadiem', (req, res) => {
  connection.connect(() => {
    connection.query("SELECT ten_xa, ten_huyen, ten_tinh FROM xa INNER JOIN huyen ON xa.ma_huyen = huyen.ma_huyen INNER JOIN tinh ON huyen.ma_tinh = tinh.ma_tinh", (err, ketQua) => {
      res.send(ketQua);
    })
  })
})


//tim kiem dia chi
app.get("/timkiem/:key", function(req, res) {
  let key = req.params.key;
  console.log("key day: " +key)
  connection.connect(() => {
      if(!key) {
        res.send("Khong co gia tri")
      }
    connection.query("SELECT ten_xa, ten_huyen, ten_tinh FROM xa INNER JOIN huyen ON xa.ma_huyen = huyen.ma_huyen INNER JOIN tinh ON huyen.ma_tinh = tinh.ma_tinh WHERE ten_xa LIKE (?) ", [['%' + key + '%']], (err, kq) => {
      console.log(err)
        res.send(kq)
    })
  })
})

// tim kiem uu dai 
app.get('/timkiemuudai/:key', (req, res) => {
  let key = req.params.key
  console.log("key: " + key)
  connection.connect(() => {
    if(!key) {
      res.send("Khong co gia tri tra ve")
    }
    connection.query("SELECT * FROM uu_dai WHERE ma_uu_dai LIKE (?) ", [['%' + key + '%']], (err, kq) => {
      console.log(err)
      res.send(kq)
    })
  })
})



//Nhan dat chuyen
app.post('/thong_tin_chuyen_xe', (req, res) => {
  connection.connect(() => {
      connection.query("INSERT INTO thong_tin_chuyen_xe (ma_nguoi_dat, ma_loai_phuong_tien, longtitude_bat_dau, latitude_bat_dau, longtitude_ket_thuc, latitude_ket_thuc) VALUE (?)", [[
      req.body.maNguoiDat, 
      req.body.maLoaiPhuongTien, 
      req.body.longtitudeBatDau, 
      req.body.latitudeBatDau, 
      req.body.longtitudeKetThuc, 
      req.body.latitudeKetThuc]], (err) => {
          res.send("Dat chuyen thanh cong!")
      })
  })
})


//Hien thi thong tin phuong tien, tai xe nhan chuyen
app.get('/thong_tin_chuyen_xe', (req, res) => {
  connection.connect(() => {
      connection.query("SELECT ho_va_ten, anh_dai_dien, sdt1, sdt2, bien_so_xe, ten_hang_xe, mau_xe FROM (thong_tin_chuyen_xe INNER JOIN thong_tin_nguoi_dung ON thong_tin_chuyen_xe.ma_tai_xe = thong_tin_nguoi_dung.ma_nguoi_dung INNER JOIN phuong_tien_nguoi_dung ON phuong_tien_nguoi_dung.ma_nguoi_dung = thong_tin_nguoi_dung.ma_nguoi_dung) WHERE ma_chuyen = 'trip1'", (err, thongTinTaiXeVaPhuongTien) => {
          res.send(thongTinTaiXeVaPhuongTien)
      })
  })
})

//Danh sach phuong tien - gia tien tuong ung
app.get('/loai_phuong_tien', (req, res) => {
  connection.connect(() => {
      connection.query("SELECT ten_loai_phuong_tien, he_so_gia FROM loai_phuong_tien", (err, dsLoaiPhuongTien) => {
          res.send(dsLoaiPhuongTien)
      })
  })
})

//Kiem tra so du
app.get('/tai_khoan_ngan_hang_lien_ket', (req, res) => {
  connection.connect(() => {
      connection.query("SELECT so_du, so_tai_khoan, ten_ngan_hang, ten_chu_tai_khoan FROM (tai_khoan_ngan_hang_lien_ket INNER JOIN ngan_hang ON tai_khoan_ngan_hang_lien_ket.ma_ngan_hang = ngan_hang.ma_ngan_hang) WHERE username_lien_ket = 1", (err, soDu) => {
          res.send(soDu)
      })
  })
})




//b5: mo cong 3000 va start sever day
app.listen(port, () => {
  console.log(`Dang chay cong: ${port}`)
})





