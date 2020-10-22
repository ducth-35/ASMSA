const mongoose = require('mongoose');


const user = new mongoose.Schema({
    email: { type: String,require: true,unique: true},
    password: { type: String,require: true },

});

module.exports = mongoose.model('usapp', user);