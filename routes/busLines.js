var AV = require('leanengine');
var request = require('request');
var router = require('express').Router();

router.get('/:name', function(req, res) {
  var name = req.params.name;
  var query = new AV.Query('BusLines');
  query.equalTo('line_name', name);
  query.equalTo('direction_id', 0);
  query.find().then(function(busData) {
    var result = {};
    busData = busData[0]._serverData;
    result.info = {
      "line_name": busData.line_name,
      "line_id": busData.line_id,
      "start_stop": busData.direction_name.split('-')[0],
      "end_stop": busData.direction_name.split('-')[1],
    }
    result.stationList = busData.station_list.split('-');
    res.send(result);
  });
});

module.exports = router;