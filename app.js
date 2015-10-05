'use strict';

/*==========================================
=            EXPRESS ENTRYPOINT            =
==========================================*/

/*==========  DEPENDENCIES  ==========*/
var express = require('express');
var glob = require('glob');
var app = express();
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var exphbs = require('express-handlebars');
var path = require('path');
var rootPath = path.normalize(__dirname + '/');
var port = process.env.PORT || 3000;

/*==========  MODEL REQUIRE  ==========*/
var models = glob.sync(rootPath + '/server/models/*.js');
models.forEach(function(model) {
    require(model);
});

/*==========  VIEW ENGINE  ==========*/
app.engine('handlebars', exphbs({
    layoutsDir: rootPath + '/server/views/layouts/',
    defaultLayout: 'main',
    partialsDir: [rootPath + '/server/views/partials/']
}));
app.set('views', rootPath + '/server/views');
app.set('view engine', 'handlebars');

/*==========  MIDDLEWARE  ==========*/
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(compress());
app.use(express.static(rootPath + '/client'));
app.use(methodOverride());

/*==========  SERVER SIDE ROUTES  ==========*/
var controllers = glob.sync(rootPath + '/server/controllers/*.js');
controllers.forEach(function(controller) {
    require(controller)(app);
});

/*==========  ERROR HANDLING  ==========*/
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});

/*==========  PORT CONFIG  ==========*/
app.listen(port, function() {
    console.log('Listening on port ' + port);
});
