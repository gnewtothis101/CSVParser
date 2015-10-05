/*=====================================
=              FILE MODEL             =
=====================================*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var File = new Schema({
    // filename: String,
    // header: Object,
    // data: Array
});

mongoose.model('File', File);
