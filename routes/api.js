var router = require('express').Router();
var request  = require('request');

var baiduKey = process.env.baiduKey;
var expressAPI = process.env.expressAPI;
var busAPIOne = process.env.busAPIOne;
var busAPITwo = process.env.busAPITwo;
var busAPIThree = process.env.busAPIThree;

router.get('/weather', function(req, res, next) {
  var option = {
    url: 'http://api.map.baidu.com/telematics/v3/weather',
    qs: {
      ak: baiduKey,
      location: 'shanghai',
      output: 'json'
    }
  }

  request(option, function(error, response, body){
    var resData = JSON.parse(body);
    var tipt = resData.results[0].index[0];
    var weather = resData.results[0].weather_data[0];
    weather.tipt = tipt;
    res.send(weather);
  });
});

router.get('/express/:type/:postId', function(req, res, next){
  var type = req.params.type;
  var postId = req.params.postId;
  var option = {
    url: expressAPI,
    qs: {
      type: type,
      postid: postId
    }
  }

  request(option, function(error, response, body){
    res.send(JSON.parse(body));
  });
});

router.get('/bus/:name', function(req, res, next){
  var name = req.params.name;
  var option = {
    url: busAPIOne,
    qs: { name: name }
  }

  var busLine = {};
  request(option, function(error, response, body){
    body = JSON.parse(body);
    for(key in body) {
      busLine[key] = body[key].trim();
    }

    var op = {
      url: busAPITwo,
      qs: {
        name: busLine.line_name,
        lineid: busLine.line_id
      }
    }

    request(op, function(error, response, bd){
      bd = JSON.parse(bd);
      console.error(bd);
      bd.busLine = busLine;
      res.send(bd);
    });
  });
});

router.get('/busstop/:name/:lineid/:stopid/:direction', function(req, res, next){
  var name = req.params.name;
  var lineId = req.params.lineid;
  var stopId = req.params.stopid;
  var direction = req.params.direction;

  var option = {
    url: busAPIThree,
    qs: {
      name: name,
      lineid: lineId,
      stopid: stopId,
      direction: direction
    }
  }

  request(option, function(error, response, body){
    res.send(JSON.parse(body));
  });
});

module.exports = router;
