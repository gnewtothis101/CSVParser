'use strict';
/*=====================================
=            SERVER ROUTES            =
=====================================*/
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var multer = require('multer');
var upload = multer({
    dest: './upload/'
});

module.exports = function(app) {
    app.use('/', router);
};

/*=================================================
=            ANGULAR ENTRY POINT ROUTE            =
=================================================*/
router.get('/', function(req, res, next) {
    if (error) {
        return next(error);
    }
    res.send('index.html');
});

/*==================================
=            UPLOAD API            =
==================================*/
router.post('/api/upload', multer({
    dest: './upload/'
}).single('uploadedFile'), function(req, res) {
    console.log(req.body);
    console.log(req.file);
    res.redirect('/#/datatable/' + req.file.filename);
});

router.get('/api/:filename', function(req, res) {

});
