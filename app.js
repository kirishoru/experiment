var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
//var mongo = require('mongoskin');
var bodyParser = require('body-parser');
var db = require('mongodb').Db;
var ObjectID = require("mongodb").ObjectID;

//
//var winston = require('winston');
//winston.add(winston.transports.File, {
//	filename: 'Experiment.log'
//});

var app = express();
var website = new express.Router();
var api = new express.Router();

//var Twitter = require('twitter-node-client').Twitter;
//var Tconfig = {
//	"consumerKey": "32tJNXxp1FPwsk10xawLyaXcF",
//	"consumerSecret": "eODOYP2BopTlFfJuy1PSFArqVJ3gjxFagXNY2Gs4M1y4BBgE0z",
//	"accessToken": "28443946-QKP6ST0aQockh59mFpXuadmYi2nHuEmkF6B2SnPb8",
//	"accessTokenSecret": "oUfy8q2bcAwrs3Iw7TYHt8GiogX0wMCRmXshfwUuOaxkU",
//	"callBackUrl": ""
//};
//var twitter = new Twitter(Tconfig);
//var twit = new express.Router();
//twit.get('/', function (req, res) {
//	var Terror = function (err, response, body) {
//			console.log('ERROR [%s]', err);
//	};
//	var Tsuccess = function (Tdata) {
////			console.log('Data [%s]', Tdata);
//		res.send(Tdata);
//	};
//	twitter.getUserTimeline({
//		screen_name: 'realDonaldTrump',
//		count: '500'
//	}, Terror, Tsuccess);
//});

app.use(bodyParser.json());

//app.use(function (req, res, next) {
//	res.header("Access-Control-Allow-Origin", "*");
//	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//	res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
//	next();
//});

app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");

	if (req.method == 'OPTIONS') {
		res.statusCode = 200;
		res.end();
		next.onOptions();
		return;
	}
	next();
});

//api.get('/posts', function (req, res, next) {
api.get('/posts', function (req, res) {
	db.connect("mongodb://effthisplace:effthisplace@ds051851.mongolab.com:51851/effthisplace", function (err, db) {
		if (err) return console.dir(err);
		db.collection('posts').find().sort({
			publishedDate: -1
		}).limit(10).toArray(function (err, posts) {
			res.json(posts);
		});
	});
});

//api.get('/placelist', function (req, res, next) {
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
	//	winston.log('AddPlace', req.body);
	db.connect("mongodb://effthisplace:effthisplace@ds051851.mongolab.com:51851/effthisplace", function (err, db) {
		if (err) return console.dir(err);
		//db.collection('placelist').insert(req.body, function (err, items) {
		db.collection('placelist').insert(req.body, function (err, res) {
			//
			if (err) return console.dir(err);
			//
			res.sendStatus(200);
			done();
		});
	});
});

api.delete('/deleteplace/:id', function (req, res, done) {
	//	winston.log('DeletePlace', req.body);
	//var placeToDelete = req.params.id;
	db.connect("mongodb://effthisplace:effthisplace@ds051851.mongolab.com:51851/effthisplace", function (err, db) {
		//		if (err) return console.dir(err);
		db.collection('placelist').remove({
			_id: ObjectID(req.params.id)
		//}, function (err, results) {
		}, function (err, res) {
			//
			if (err) return console.dir(err);
			//
			res.sendStatus(200);
			done();
		});
	});
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', website);
app.use('/api', api);
//app.use('/twit', twit);

var port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log("Listening on " + port);
});