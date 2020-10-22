const GioHang = require('../model/giohang');

//get tất cả sản phẩm
exports.getAll = function (request, response) {
    GioHang.find({})
        .lean()
        .exec(function (error, data) {
            response.render('getAllGioHang', { sanphamList: data.reverse()});
            // console.log(data);
            if (error) {
                log(error);
            }
        });
}

//xóa sản phẩm
exports.deletegiohang = function (request, response) {
    GioHang.deleteOne({ _id: request.params.id }, (err, doc) => {
        if (!err) {
            response.redirect('/getAllGioHang');
        } else {
            console.log(err);
        }
    });
};
