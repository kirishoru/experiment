'use strict';
module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('pages/index');
    });
    app.get('/about', function (req, res) {
        res.render('pages/about');
    });
    app.get('/calc', function (req, res) {
        res.render('pages/calc');
    });
/*    app.get('/dash', function (req, res) {
        res.render('pages/about');
    });*/
    app.get('/resume', function (req, res) {
        res.render('pages/resume');
    });
    app.get('/bot', function (req, res) {
        res.render('pages/bot');
    });
    app.get('/bot', function (req, res) {
        res.render('pages/baelic');
    });
};