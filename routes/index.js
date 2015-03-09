var express = require('express');
var router = express.Router();

router.get('/placelist', function(req, res) {
    var db = req.db;
    db.collection('placelist').find().sort({timestamp: -1}).limit(50).toArray(function (err, items) {
        res.json(items);
    });
});

router.post('/addplace', function(req, res) {
    var db = req.db;
    db.collection('placelist').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

router.delete('/deleteplace/:id', function(req, res) {
    var db = req.db;
    var placeToDelete = req.params.id;
    db.collection('placelist').removeById(placeToDelete, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;
