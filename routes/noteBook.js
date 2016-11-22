var AV = require('leanengine');
var request = require('request');
var router = require('express').Router();

var APP_ID = process.env.APP_ID;
var APP_KEY = process.env.APP_KEY;

AV.init({ appId: APP_ID, appKey: APP_KEY });

router.get('/add', function(req, res, next) {
  var NoteBook = AV.Object.extend('TestObject');
  var boodBook = new NoteBook();
  boodBook.save({
    note: 'Hello World!'
  }).then(function(object) {
    console.error('note save success');
  })
});

module.exports = router;