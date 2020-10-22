const Users = require('../model/user');

//get tất cả sản phẩm
exports.getAll = function (request, response) {
    Users.find({})
        .lean()
        .exec(function (error, data) {
            response.render('quanlyuser', { watchList: data.reverse()});
            // console.log(data);
            if (error) {
                log(error);
            }
        });
};

//get 1 sản phẩm
exports.getUsers = function (request, response) {
    Users.findById(request.params.id)
        .lean()
        .exec((err, doc) => {
            if (!err) {
                response.render('edit', { Users: doc });
            }
        });
};


//chỉnh sửa
exports.edit = function (request, response) {
    Users.updateOne(
        { _id: request.body._id },
        { $set: { email: request.body.email, password: request.body.password} },
        (err, doc) => {
            if (!err) {
                response.redirect('/quanlyuser');
            } else {
                console.log('Edit Failed');
            }
        }
    );
};

//xóa sản phẩm
exports.delete = function (request, response) {
    Users.deleteOne({ _id: request.params.id }, (err, doc) => {
        if (!err) {
            response.redirect('/quanlyuser');
        } else {
            console.log(err);
        }
    });
};
