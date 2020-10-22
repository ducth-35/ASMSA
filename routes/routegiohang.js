//import modules

var express = require('express');
var router = express();
//import controllers
const giohangController = require('../controllers/giohangcontroller');

//import models
const GioHangmodel = require('../model/giohang');

//get All
router.get('/getAllGioHang', giohangController.getAll);


//delete
router.get('/deleteGiohang/:id', giohangController.deletegiohang);









module.exports = router;
