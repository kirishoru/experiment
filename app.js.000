var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var mongo = require('mongoskin');

var db = mongo.db("mongodb://effthisplace:effthisplace@ds051851.mongolab.com:51851/effthisplace", {native_parser:true});

var routes = require('./routes/index');

var app = express();

app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use(favicon(__dirname + '/public/img/favicon.ico'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//app.listen(process.env.PORT || 3000);

module.exports = app;
