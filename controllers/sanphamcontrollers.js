const Sanpham = require('../model/sanpham');

//get tất cả sản phẩm
exports.getAll = function (request, response) {
    Sanpham.find({})
        .lean()
        .exec(function (error, data) {
            response.render('quanlysanpham', { sanphamList: data.reverse()});
            // console.log(data);
            if (error) {
                log(error);
            }
        });
};
exports.getAllsanpham = function (request, response) {
    Sanpham.find({})
        .lean()
        .exec(function (error, data) {
            response.render('sanpham', { data: data.reverse()});
            // console.log(data);
            if (error) {
                log(error);
            }
        });
};


//get 1 sản phẩm
exports.getsanpham = function (request, response) {
    Sanpham.findById(request.params.id)
        .lean()
        .exec((err, doc) => {
            if (!err) {
                response.render('editsanpham', { Sanpham: doc });
            }
        });
};


//chỉnh sửa
exports.editsanpham = function (request, response) {
    Sanpham.updateOne(
        { _id: request.body._id },
        { $set: {tensanpham: request.body.tensanpham, giatien:request.body.giatien , mausac:request.body.mausac , theloai:request.body.theloai} },
        (err, doc) => {
            if (!err) {
                response.redirect('/quanlysanpham');
            } else {
                console.log('Edit Failed');
            }
        }
    );
};

//xóa sản phẩm
exports.deletesanpham = function (request, response) {
    Sanpham.deleteOne({ _id: request.params.id }, (err, doc) => {
        if (!err) {
            response.redirect('/quanlysanpham');
        } else {
            console.log(err);
        }
    });

};
