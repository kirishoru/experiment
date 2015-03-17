var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var mongo = require('mongoskin');
var bodyParser = require('body-parser');
var db = require('mongodb').Db;
var ObjectID = require("mongodb").ObjectID;

var winston = require('winston');
winston.add(winston.transports.File, {
	filename: 'Experiment.log'
});

var app = express();
var website = new express.Router();
var api = new express.Router();

api.get('/placelist', function (req, res) {
	db.connect("mongodb://effthisplace:effthisplace@ds051851.mongolab.com:51851/effthisplace", function (err, db) {
		if (err) return console.dir(err);
		db.collection('placelist').find().sort({
			timestamp: -1
		}).limit(50).toArray(function (err, items) {
			res.json(items);
		});
	});
});

api.post('/addplace', function (req, res, done) {
//	winston.log('info', req.body);
	db.connect("mongodb://effthisplace:effthisplace@ds051851.mongolab.com:51851/effthisplace", function (err, db) {
		if (err) return console.dir(err);
		db.collection('placelist').insert(req.body, function (err, items) {
			console.log(items);
			res.sendStatus(200);
			done();
		});
	});
});

api.delete('/deleteplace/:id', function (req, res, done) {
	var placeToDelete = req.params.id;
	db.connect("mongodb://effthisplace:effthisplace@ds051851.mongolab.com:51851/effthisplace", function (err, db) {
//		if (err) return console.dir(err);
		db.collection('placelist').remove({_id: ObjectID(req.params.id)}, function (err, results) {
			res.sendStatus(200);
			done();
		});
	});
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', website);
app.use('/api', api);

var port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log("Listening on " + port);
});