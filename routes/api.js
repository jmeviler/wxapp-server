var AV = require('leanengine');
var ObjTree = require('objtree');
var request = require('request');
var router = require('express').Router();
var logger = require('log4js').getLogger();

var baiduKey = process.env.baiduKey;
var expressAPI = process.env.expressAPI;
var busAPIOne = process.env.busAPIOne;
var busAPITwo = process.env.busAPITwo;
var busAPIThree = process.env.busAPIThree;
var detailUrl = process.env.busAPIFour;
var dispatchUrl = process.env.busAPISix;

function saveBusName (name) {
  var queryObj = new AV.Query('BusNames');
  queryObj.equalTo('name', name).find().then(function(data) {
    if (data.length) {
      var updateObj = AV.Object.createWithoutData('BusNames', data[0].id);
      updateObj.save().then(function (updateObj) {
        updateObj.increment('count', 1);
        updateObj.fetchWhenSave(true);
        return updateObj.save();
      }).then(function (updateObj) {
        logger.debug(name, '---update bus name success');
      }, function (error) {
        logger.error(JSON.stringify(error), '---update bus name fail');
      });
    } else {
      var BusNames = AV.Object.extend('BusNames');
      var busNames = new BusNames();
      busNames.save({ 'name': name }).then(function(object) {
        logger.debug(name, '---save bus name success');
      });
    }
  });
}

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
    qs: { type: type, postid: postId }
  }

  request(option, function(error, response, body){
    res.send(JSON.parse(body));
  });
});

router.get('/bus/:name', function(req, res, next){
  // 本程序部署版本不在支持返回
  // var name = req.params.name;
  // saveBusName(name);
  // var option = {
  //   url: busAPIOne,
  //   qs: { action: 'One', name: name }
  // }
  // var busLine = {};
  // request(option, function(error, response, body){
  //   if (response && response.statusCode === 200) {
  //     body = JSON.parse(body);
  //     for(key in body) {
  //       busLine[key] = body[key].trim();
  //     }
  //     var op = {
  //       url: busAPITwo,
  //       qs: { action: 'Two', name: busLine.line_name, lineid: busLine.line_id }
  //     }
  //     request(op, function(error, response, bd){
  //       bd = JSON.parse(bd);
  //       bd.busLine = busLine;
  //       res.send(bd);
  //     });
  //   } else {
  //     var query = new AV.Query('LinesInfo');
  //     query.equalTo('line_name', name);
  //     query.find().then(function(busData) {
  //       var result = {};
  //       busData = busData[0]._serverData;
  //       result.busLine = {
  //         "line_name": busData.line_name,
  //         "line_id": busData.line_id,
  //         "start_stop": busData.start_stop,
  //         "end_stop": busData.end_stop,
  //         "start_earlytime": busData.start_earlytime,
  //         "start_latetime": busData.start_latetime,
  //         "end_earlytime": busData.end_earlytime,
  //         "end_latetime": busData.end_latetime
  //       };
  //       result.lineResults0 = busData.lineResults0;
  //       result.lineResults1 = busData.lineResults1;
  //       res.send(result);
  //     });
  //   }
  // });

  var result = {};
  result.busLine = {
    "line_name": '请使用 上海Bus 小程序',
    "line_id": '0',
    "start_stop": '请使用 上海Bus 小程序',
    "end_stop": '本程序不再维护',
    "start_earlytime": '本程序不再维护',
    "start_latetime": '请使用 上海Bus 小程序',
    "end_earlytime": '本程序不再维护',
    "end_latetime": '请使用 上海Bus 小程序'
  };
  result.lineResults0 = {
    "direction": true,
    "stops": [
      {
        "zdmc": "通知: 本程序不再维护",
        "id": "1"
      },
      {
        "zdmc": "请搜索使用 上海Bus 小程序",
        "id": "2"
      },
      {
        "zdmc": "全新升级, 稳定实时",
        "id": "3"
      },
    ]
  };

  result.lineResults1 = {
    "direction": false,
    "stops": [
      {
        "zdmc": "请搜索使用 上海Bus 小程序",
        "id": "1"
      },
      {
        "zdmc": "全新升级, 稳定实时",
        "id": "2"
      },
    ]
  };

  res.send(result);
});

router.get('/busstop/:name/:lineid/:stopid/:direction', function(req, res, next){
  var name = req.params.name;
  var lineId = req.params.lineid;
  var stopId = req.params.stopid;
  var direction = req.params.direction;
  res.send({ "cars": [] });

  var option = {
    url: busAPIThree,
    qs: { action: 'Three', name: name, lineid: lineId, stopid: stopId, direction: direction }
  }

  request(option, function(error, response, body){
    if (response && response.statusCode === 200) {
      res.send(JSON.parse(body));
    } else {
      option.url = detailUrl;
      option.direction = option.direction ? true : false;
      request(option, function(error, response, bd){
        if (response && response.statusCode === 200) {
          var xotree = new ObjTree();
          var cars = xotree.parseXML(bd).result.cars.car
          if (cars[0].time !== 'null') {
            res.send({ cars: cars });
          } else {
            res.send({ "cars": [] });
            // request({
            //   url: dispatchUrl,
            //   qs: { direction: direction, lineid: lineId, stopid: stopId }
            // }, function(error, response, resBd){
            //   var xotree = new ObjTree();
            //   var cars = xotree.parseXML(resBd).result.cars.car || [];
            //   res.send({ "cars": cars, noCar: true });
            // });
          }
        } else {
          res.send({ "cars": [] });
        }
      });
    }
  });
});

module.exports = router;
