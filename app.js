var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
// var routes = require('public/routes/index.js');
var app = express();
var website = new express.Router();
// var api = new express.Router();
var port = process.env.PORT || 3000;

// app.use('/public', express.static(process.cwd(), + 'public'));
// app.set('view engine', 'ejs');

// app.use(bodyParser.json());
//
// app.use(function (req, res, next) {
// 	res.setHeader("Access-Control-Allow-Origin", "*");
// 	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// 	res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
//
// 	if (req.method == 'OPTIONS') {
// 		res.statusCode = 200;
// 		res.end();
// 		next.onOptions();
// 		return;
// 	}
// 	next();
// });

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', website);

// routes(app);

app.listen(port, function () {
	console.log("Listening on " + port);
});