const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-type-email');
const user = new Schema({
    email: { type: mongoose.SchemaTypes.Email,require: true,unique: true},
    password: { type: String,require: true },
    image: { type: String,require: true },
});

module.exports = mongoose.model('Khachhang', user);
