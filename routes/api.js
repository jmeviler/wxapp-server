var router = require('express').Router();
var request  = require('request');

var baiduKey = process.env.baiduKey;

var option = {
  url: 'http://api.map.baidu.com/telematics/v3/weather',
  qs: {
    ak: baiduKey,
    location: 'shanghai',
    output: 'json'
  }
}

router.get('/weather', function(req, res, next) {
  request(option, function(error, response, body){
    var resData = JSON.parse(body);
    var tipt = resData.results[0].index[0];
    var weather = resData.results[0].weather_data[0];
    weather.tipt = tipt;
    res.send(weather);
  });
});

module.exports = router;