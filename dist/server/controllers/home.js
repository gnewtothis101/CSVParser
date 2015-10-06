'use strict';
/*=====================================
=            SERVER ROUTES            =
=====================================*/
var express = require('express');
var router = express.Router();
var fs = require('fs');

// Environment variables
require('../../env.js');

// Database stuff
var MongoClient = require('mongodb').MongoClient;
var mongo = require('mongodb');
var Grid = require('gridfs-stream');
// var db = new mongo.Db('csvparser', new mongo.Server(process.env.MONGOLAB_URI));

// Upload stuff
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './upload/');
    },
    filename: function(req, file, callback) {
        callback(null, util.formatFilename(file.originalname) + '__' + (new Date().getTime() / 1000).toString().split('.')[0]);
    }
});
var upload = multer({
    storage: storage
});

// Piping stuff
var Transform = require('stream').Transform;

// Package to parse CSV files and turn them into JSON.
// Reference: https://github.com/klaemo/csv-stream
var csv = require('csv-streamify');

// Package to convert JSON to strings.
// Reference: https://github.com/dominictarr/JSONStream
var JSONStream = require('JSONStream');

// Custom utility module
var util = require('../modules/utilityFunctions.js');

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

/*================================
=            FILE API            =
================================*/
router.post('/api/upload', upload.single('uploadedFile'), function(req, res, next) {

    // Open db
    MongoClient.connect(process.env.MONGOLAB_URI, function(error, db) {
        if (error) {
            console.log(error);
        }
        var gfs = Grid(db, mongo);

        // Write to db with filename matching the file uploaded
        var writestream = gfs.createWriteStream({
            filename: req.file.filename
        });

        // Create readstream from upload folder, pipe to writestream...
        fs.createReadStream('./upload/' + req.file.filename).pipe(writestream);

        // ...when writestream is closed, delete file from server folder and redirect to a page to view the file.
        writestream.on('close', function(file) {
            fs.unlink('./upload/' + req.file.filename);
            res.redirect('/#/datatable/' + req.file.filename);
        });
    });
});

router.get('/api/upload', function(req, res) {

    // Array to be filled with data to send to client
    var jsonResponse = [];

    // Connect to db
    MongoClient.connect(process.env.MONGOLAB_URI, function(error, db) {
        if (error) {
            console.log(error);
        } else {

            // Query db for all files in fs.files collection, return with an array as data
            db.collection('fs.files').find().toArray(function(error, data) {
                if (error) {
                    console.log(error);
                } else {

                    // For each item in the array, send it's filename and upload date as a single object to the jsonResponse array.
                    data.forEach(function(item) {
                        var responseObject = {};
                        responseObject.filename = item.filename;
                        responseObject.uploadDate = item.uploadDate;
                        jsonResponse.push(responseObject);
                    });
                }

                // When all data has been recieved and db closes, respond to client with jsonResponse object
                db.on('close', function() {
                    res.json(jsonResponse);
                });

                // Close the db
                db.close();
            });
        }
    });
});

router.get('/api/:filename', function(req, res) {

    // Cached filename
    var filename = req.params.filename;

    // Pull the date out of :filename
    var filenameDate = filename.split('__')[1];

    // Open db
    MongoClient.connect(process.env.MONGOLAB_URI, function(error, db) {
        if (error) {
            console.log(error);
        }

        // Instantiate various piping tools
        var gfs = Grid(db, mongo);

        var csvToJson = csv({
            objectMode: true,
            delimiter: '|'
        });

        var parser = new Transform({
            objectMode: true
        });

        var jsonToStrings = JSONStream.stringify();


        // Create readstream from database where the filename is the url param
        var readstream = gfs.createReadStream({
            filename: req.params.filename
        });

        // Create the header object, to later be populated.
        parser.header = null;

        // Create a raw header, to manipulate data before being
        // pushed to the actual header.
        parser._rawHeader = {};

        parser._transform = function(data, encoding, done) {
            if (!this.header) {

                // Create the header information
                var timestamp = util.getFormattedDate(filenameDate);

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
                var currentData = util.formatRow(data, this.header.key);

                // Begin pushing data rows
                this.push(currentData);
            }
            done();
        };

        // Actual piping
        readstream
            .pipe(csvToJson)
            .pipe(parser)
            .pipe(jsonToStrings)
            .pipe(res);

        readstream.on('error', function(error) {
            res.end(error);
        });
    });
});
