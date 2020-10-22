//import modules
const multer = require('multer');
const path = require('path');
var express = require('express');
var router = express();
//import controllers
const watchController = require('../controllers/users');

//import models
const Watch = require('../model/user');

// router.post('/register', watchController.register);

//get All
router.get('/quanlyuser', watchController.getAll);
//get Watch
router.get('/edit/:id', watchController.getUsers);
//edit
router.post('/edit', watchController.edit);
//delete
router.get('/delete/:id', watchController.delete);



//cấu hình multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
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
router.post('/upload', upload.single('image'), (request, response) => {
    let watch = new Watch({
        email: request.body.email,
        password: request.body.password,
        image: request.file.originalname,

    });

    watch.save(function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            response.redirect('/login');
        }
    });
});
module.exports = router;
