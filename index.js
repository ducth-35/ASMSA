let express = require('express')
let hbs = require('express-handlebars');
let mongoose = require('mongoose');
let routes = require('./routes/routes.js');
let routesanpham = require('./routes/routessanpham');
var Admin = require('./model/user');
var PD=require('./model/sanpham');
var GH=require('./model/giohang');


mongoose.connect('mongodb+srv://duc123:1234567890@cluster0.gqbxl.gcp.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(function (conn) {
        console.log('Kết nối MongoDB thành công, port 2000')
    })

// let userSchema = require('./model/userSchema');
// let User = mongoose.model('user',userSchema,'user')

let app = express();

app.use(express.static('uploads'));
app.use(express.static('views'));
app.use(express.static('uploadsanpham'));

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(routes);
app.use(routesanpham);

app.engine('.hbs',hbs({
    extname: 'hbs',
    defaultLayout: '',
    layoutsDir: '',

}))
app.set('view engine','.hbs')

app.get('/', function (req, res) {
    res.render('login');
});
app.listen(2000);

app.get('/quanlysanpham', function (req, res) {
    res.render('quanlysanpham');
});
app.get('/formsanpham',function (req,res) {
    res.render('formsanpham');
})
app.get('/formdulieu',function (req,res) {
    res.render('formdulieu');
})
app.get('/quanlyuser',function (req,res) {
    res.render('quanlyuser');
})
app.get('/login',function (req,res) {
    res.render('login');
})
app.get('/sanpham', (req,res)=>{
    res.render('sanpham')
})

app.post('/login', function (req, res) {
    Admin.findOne({email: req.body.email}&&{password: req.body.password})
        .then(data => {
            if (data) {
                if (data.password = req.body.password) {
                    res.redirect('formsanpham');
                }
            }
        });
});


app.get('/getAllJson', async (req,res)=>{
    let sp = await PD.find({})
    try{
        res.send(sp);
        // res.render('users')
    }catch (e) {
        res.send('Co loi xay ra: ' +e.message)
    }
})
app.get('/getAllGioHang', async (req,res)=>{
    let gh = await GH.find({})
    try{
        res.send(gh);
        // res.render('users')
    }catch (e) {
        res.send('Co loi xay ra: ' +e.message)
    }
})
app.get('/getAllUserWeb', async (req,res)=>{
    let ad = await Admin.find({})
    try{
        res.send(ad);

    }catch (e) {
        res.send('Co loi xay ra: ' +e.message)
    }
})

app.post('/signupuser', async (req,res)=>{
    const user = {
        email: req.body.email,
        password: req.body.password
    };
    console.log(user);
    let userdata = await Admin.find({email: req.body.email});
    if(userdata.length === 0){
        let users =await Admin.create(user)
        try{
            res.send({status: true, user:users});
        }catch (e) {
            res.send({status: false,msg: 'Co loi xay ra: ' +e.message})
        }
    }else {
        res.send({status: false, msg:"user đã tồn tại"});
        console.log('User da ton tai')
    }


});
app.post('/signinuser', async (req,res)=>{
    const user = {
        email: req.body.email,
        password: req.body.password
    };

    let userdata = await Admin.find({email: req.body.email,password:req.body.password});
    if(userdata.length === 0){
        console.log('Đăng nhập không thành công')

    }else {
        console.log(user);
        try{
            res.send({status: true, msg:""});
        }catch (e) {
            res.send({status: false,msg: 'Co loi xay ra: ' +e.message})
        }
    }


});
app.post('/addGioHang', async (req,res)=>{
    const giohang = {
        tensanpham: req.body.tensanpham,
        giatien: req.body.giatien,
        image:req.body.image
    };
    console.log(giohang);
        let hangs =await GH.create(giohang)
        try{
            res.send({status: true, giohang:hangs});
        }catch (e) {
            res.send({status: false,msg: 'Co loi xay ra: ' +e.message})
        }



});
app.post('/deletePro', async (req,res)=>{
    const pro = {
        _id: req.body._id,
        tensanpham: req.body.tensanpham,
        giatien: req.body.giatien,
        image:req.body.image

    };
    console.log(pro);
    GH.deleteOne({_id: req.body._id}, (err, doc) => {
        if (!err) {
            res.send({status: true, msg:"Xóa thành công"});
        } else {
            res.send({status: false,msg: 'Co loi xay ra: ' +err.message})
        }
    });



});
app.post('/deleteAllPro', async (req,res)=>{

        GH.deleteOne({_id: req.body._id}, (err, doc) => {
            if (err) {
                res.send({status: true, msg:'Xóa thành công'});
            } else {
                res.send({status: false,msg: 'Co loi xay ra: '})
            }
        });}



);
app.post('/tinhtong', async (req,res)=>{
   GH.aggregate([
        {
            $giohangs: {
                tong: { $sum: "$giatien"},
              }
            }

    ])
        let gh = await GH.find({})
        try{
            res.send(gh);

        }catch (e) {
            res.send('Co loi xay ra: ' +e.message)
        }
}

);





