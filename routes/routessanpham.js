//import modules
const multer = require('multer');
const path = require('path');
var express = require('express');
var router = express();
//import controllers
const sanphamController = require('../controllers/sanphamcontrollers');

//import models
const Sanphammodel = require('../model/sanpham');

//get All
router.get('/quanlysanpham', sanphamController.getAll);
//get Watch
router.get('/editsanpham/:id', sanphamController.getsanpham);
//edit
router.post('/editsanpham', sanphamController.editsanpham);
//delete
router.get('/deletesanpham/:id', sanphamController.deletesanpham);
router.get('/sanpham', sanphamController.getAllsanpham);



//cấu hình multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploadsanpham');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage: storage,
    //kiểm tra file upload có phải là hình ảnh hay không
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'));
        }
        callback(null, true);
    },
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
});


//phương thức upload file + insert dư liệu vào mongoDB
router.post('/uploadsanpham', upload.single('image'), (request, response) => {
    let sanphammodel = new Sanphammodel({
        tensanpham: request.body.tensanpham,
        giatien: request.body.giatien,
        mausac: request.body.mausac,
        theloai: request.body.theloai,
        image: request.file.originalname, //chỉ lấy tên file upload

    });

    sanphammodel.save(function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            response.redirect('/sanpham');
        }
    });
});
module.exports = router;
