var AV = require('leanengine');
var request = require('request');
var router = require('express').Router();

router.get('/add', function(req, res, next) {
  var NoteBook = AV.Object.extend('noteBook');
  var boodBook = new NoteBook();
  boodBook.save({
    note: 'Hello World!'
  }).then(function(object) {
    res.send('note save success');
    console.error('note save success');
  })
});

module.exports = router;