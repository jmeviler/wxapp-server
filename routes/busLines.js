var AV = require('leanengine');
var request = require('request');
var router = require('express').Router();

router.get('/:name', function(req, res) {
  var name = req.params.name;
  var query = new AV.Query('LinesInfo');
  query.equalTo('line_name', name);
  query.find().then(function(busData) {
    var result = {};
    busData = busData[0]._serverData;
    result.busLine = {
      "line_name": busData.line_name,
      "line_id": busData.line_id,
      "start_stop": busData.start_stop,
      "end_stop": busData.end_stop,
    };
    result.lineResults0 = busData.lineResults0;
    result.lineResults1 = busData.lineResults1;
    res.send(result);
  });
});

router.get('/names/all', function(req, res) {
  var name = req.params.name;
  var query = new AV.Query('Lines');
  query.exists('names');
  query.find().then(function(result) {
    res.send(result[0]);
  });
});

module.exports = router;