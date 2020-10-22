const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sanpham = new Schema({
    tensanpham: { type: String,require: true,unique: true},
    giatien: { type: Number,require: true },
    mausac: { type: String,require: true },
    theloai: { type: String,require: true },
    image: { type: String,require: true },
});

module.exports = mongoose.model('Sanpham', sanpham);
