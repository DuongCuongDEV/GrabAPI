const express = require('express');
const { json } = require('express/lib/response');
const nodemailer = require("nodemailer");
const mysql = require('mysql2');

const bodyParser = require('body-parser');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'Grab',
    password: ''
});


const app = express()
const port = 3000


//Để đọc dạng json người dùng nhập vào
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




//API lấy về các tỉnh
app.get('/conscious', (req, res) => {
    connection.connect(() => {
        connection.query("SELECT * FROM tinh", (err, ketQuaTinh) => {
            res.send(ketQuaTinh)
        })
    })
})

//API lấy các huyện của một tỉnh nào đấy
app.get('/district', (req, res) => {
    connection.connect(() => {
        connection.query("SELECT * FROM huyen where ma_tinh = (?)", [req.body.maTinh], (err, ketquahuyen) => {
            res.send(ketquahuyen)
        })
    })
})


//API lấy các xã của một huyện nào đấy
app.get('/commune', (req, res) => {
    connection.connect(() => {
        connection.query("SELECT * FROM xa where ma_huyen = (?)", [req.body.maHuyen], (err, ketquaxa) => {
            res.send(ketquaxa)
        })
    })
})

//API check trạng thái tên đăng nhập
app.get('/checkEmail', (req, res) => {
    connection.connect(() => {
        connection.query("SELECT * FROM thong_tin_tai_khoan where tenDangNhap = (?)", [req.body.tenDangNhap], (err, thongtintaikhoan) => {
            res.send(thongtintaikhoan)
        })
    })
})



//API tạo tài khoản cho người dùng
app.post('/creatAccount', (req, res) => {
    connection.connect(() => {
        let maND = -1
            //API tạo thông tin người dùng
        connection.query("INSERT INTO `thong_tin_nguoi_dung` (`ho_va_ten`, `anh_dai_dien`, `sdt1`, `sdt2`, `email`, `ma_gioi_tinh`, `ngay_sinh`, `dia_chi_chi_tiet`, `ma_xa`) VALUES (?)", [
            [req.body.hoVaTen, req.body.anhDaiDien, req.body.sdt1, req.body.sdt2, req.body.email, req.body.maGioiTinh, req.body.ngaySinh, req.body.diaChiChiTiet, req.body.maXa]
        ], (err) => {
            res && connection.query('select ma_nguoi_dung from thong_tin_nguoi_dung order by ma_nguoi_dung desc limit 1', (err, kq) => {
                maND = kq[0].ma_nguoi_dung

                //API tạo thông tin tài khoản
                connection.query("INSERT INTO `thong_tin_tai_Khoan` (`maNguoiDung`, `maQuyenNguoiDung`, `ngayTao`, `ngayCapNhatCuoi`, `bienSoXe`, `ma_trang_thai`, `maNguoiTao`, `tenDangNhap`, `matKhau`) VALUES (?)", [
                    [maND, req.body.maQuyenNguoiDung, req.body.ngayTao, req.body.ngayCapNhatCuoi, req.body.bienSoXe, req.body.ma_trang_thai, req.body.maNguoiTao, req.body.tenDangNhap, req.body.matKhau]
                ], (err) => {
                    console.log("mand", maND)
                    res.send("Thêm tài khoản thành công")
                })
            })

        })
    })
})


//API lấy thông tin người dùng qua thông tin tài khoản
app.get('/userInformation', (req, res) => {
    connection.connect(() => {
        connection.query("SELECT * FROM thong_tin_nguoi_dung where ma_nguoi_dung = (?)", [req.body.maNguoiDung], (err, thongtinnguoidung) => {
            res.send(thongtinnguoidung)
        })
    })
})

//API tạo thông tin tài khoản phần đăng nhập
app.get('/thongTinTaiKhoan', (req, res) => {
        connection.connect(() => {
            connection.query("SELECT * FROM thong_tin_tai_khoan WHERE tenDangNhap  = (?) AND matKhau = (?) ", [req.body.tenDangNhap, req.body.matKhau], (err) => {
                res.send("Đăng nhập thành công")
            })
        })
    })
    //API quên mật khẩu 
app.post('/sendEmail', (req, res) => {
    connection.connect(() => {
        async function sendMessage() {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'phuongtttph28706@fpt.edu.vn',
                    pass: 'baonhi0908@'
                }
            })
            var mailOptions = {
                from: 'phuongtttph28706@fpt.edu.vn',
                to: `${req.body.email}`,
                subject: 'Sending message from Grab',
                text: 'Hello',
                html: `<a href="http://facebook.com">Need to reset password</a>`
            }
            await transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log('Email sent: ' + info.response)
                }
            })
        }
        sendMessage();
        res.send("Send Success!!")
    })
})
app.put('/changePassword', (req, res) => {
    connection.connect(() => {
        if (req.body.matKhauMoi == req.body.nhapLaiMatKhauMoi) {
            connection.query("UPDATE thong_tin_tai_khoan SET matKhau = ? where tenDangNhap = (?)", [req.body.matKhauMoi, req.body.tenDangNhap], (err) => {
                res.send("Thay đổi mật khẩu thành công")
            })
        } else {
            res.send("Pass not match!!")
        }
    })
})




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
    console.log("key day: " + key)
    connection.connect(() => {
        if (!key) {
            res.send("Khong co gia tri")
        }
        connection.query("SELECT ten_xa, ten_huyen, ten_tinh FROM xa INNER JOIN huyen ON xa.ma_huyen = huyen.ma_huyen INNER JOIN tinh ON huyen.ma_tinh = tinh.ma_tinh WHERE ten_xa LIKE (?) ", [
            ['%' + key + '%']
        ], (err, kq) => {
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
        if (!key) {
            res.send("Khong co gia tri tra ve")
        }
        connection.query("SELECT * FROM uu_dai WHERE ten_uu_dai LIKE (?) ", [
            ['%' + key + '%']
        ], (err, kq) => {
            console.log(err)
            res.send(kq)
        })
    })
})


//Nhan dat chuyen
app.post('/thong_tin_chuyen_xe', (req, res) => {
    connection.connect(() => {
        connection.query("INSERT INTO thong_tin_chuyen_xe (ma_nguoi_dat, ma_loai_phuong_tien, longtitude_bat_dau, latitude_bat_dau, longtitude_ket_thuc, latitude_ket_thuc) VALUE (?)", [
            [
                req.body.maNguoiDat,
                req.body.maLoaiPhuongTien,
                req.body.longtitudeBatDau,
                req.body.latitudeBatDau,
                req.body.longtitudeKetThuc,
                req.body.latitudeKetThuc
            ]
        ], (err) => {
            res.send("Dat chuyen thanh cong!")
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

//Hien thi thong tin phuong tien, tai xe nhan chuyen
app.get('/thong_tin_chuyen_xe', (req, res) => {
    connection.connect(() => {
        connection.query("SELECT ho_va_ten, anh_dai_dien, sdt1, sdt2, bien_so_xe, ten_hang_xe, mau_xe FROM (thong_tin_chuyen_xe INNER JOIN thong_tin_nguoi_dung ON thong_tin_chuyen_xe.ma_tai_xe = thong_tin_nguoi_dung.ma_nguoi_dung INNER JOIN phuong_tien_nguoi_dung ON phuong_tien_nguoi_dung.ma_nguoi_dung = thong_tin_nguoi_dung.ma_nguoi_dung) WHERE ma_chuyen = 'trip1'", (err, thongTinTaiXeVaPhuongTien) => {
            res.send(thongTinTaiXeVaPhuongTien)
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





//Mở một cổng 3000 để chạy
app.listen(port, () => {
    console.log(`Ban dang o cong: ${port}`)
})