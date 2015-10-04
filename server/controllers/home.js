'use strict';
/*=====================================
=            SERVER ROUTES            =
=====================================*/
var express = require('express');
var router = express.Router();
var fs = require('fs')
var mongoose = require('mongoose');
var User = mongoose.model('User');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './upload/');
    },
    filename: function(req, file, callback) {
        callback(null, util.formatFilename(file.originalname) + '__' + Date.now());
    }
});
var upload = multer({
    storage: storage
});

var Transform = require('stream').Transform;

// Package to parse CSV files and turn them into JSON.
// Reference: https://github.com/klaemo/csv-stream
var csv = require('csv-streamify');

// Package to convert JSON to strings.
// Reference: https://github.com/dominictarr/JSONStream
var JSONStream = require('JSONStream');

var util = require('../modules/utilityFunctions.js');

var csvToJson = csv({
    objectMode: true,
    delimiter: '|'
});

var parser = new Transform({
    objectMode: true
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
router.post('/api/upload', upload.single('uploadedFile'), function(req, res, next) {
    res.redirect('/#/datatable/' + req.file.filename);
});

router.get('/api/:filename', function(req, res) {

    var filename = req.params.filename;

    var JSONResponse = {};

    fs.readFile('./upload/' + filename, function(error, data) {
        if (error) {
            console.log(error);
        }

        // Create the header object, to later be populated.
        parser.header = null;

        // Create a raw header, to manipulate data before being
        // pushed to the actual header.
        parser._rawHeader = {};

        parser._transform = function(data, encoding, done) {
            if (!this.header) {

                // Create the header information
                var timestamp = util.getFormattedDate();

                // Push to _rawHeader
                this._rawHeader.timestamp = timestamp;
                this._rawHeader.filename = filename.split('__')[0] + '.csv';
                this._rawHeader.key = data;

                // Push _rawHeader to header
                this.header = this._rawHeader;

                // Attach header to file
                this.push({
                    header: this.header
                });

                // Once header information has been set
            } else {

                // Format data
                var currentData = util.formatRow(data);
                var currentArray = [
                    currentData[0],
                    currentData[1],
                    currentData[2],
                    currentData[3],
                    currentData[4],
                ];

                // Begin pushing data rows
                this.push(currentArray);
            }
            done();
        };

        var jsonToStrings = JSONStream.stringify();

        var readStream = fs.createReadStream('./upload/' + filename);
        readStream
            .pipe(csvToJson)
            .pipe(parser)
            .pipe(jsonToStrings)
            .pipe(res);

        readStream.on('error', function(error) {
            res.end(error);
        });

    });

});
