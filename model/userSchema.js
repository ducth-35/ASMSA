let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
    },
    phone:{
        type: Number,
        require: true,
    },
    address:{
        type: String,
        require: true,
    },
    birthday:{
        type: String,
        require: true,
    }



})
module.exports = userSchema;