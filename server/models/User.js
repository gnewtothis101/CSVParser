/*=====================================
=            EXAMPLE MODEL            =
=====================================*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var User = new Schema({
    username: String,
    password: String,
    email: String,
    dateJoined: Date
});

mongoose.model('User', User);
