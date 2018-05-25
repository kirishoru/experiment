'use strict';

module.exports = function (app) {
    app.get('/', function(req, res) {
    res.render('../pages/index');
    });

    app.get('/resume', function(req, res) {
    res.render('resume2');
    });
};