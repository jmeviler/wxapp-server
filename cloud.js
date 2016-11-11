var AV = require('leanengine');
var rp = require('request-promise');
var http = require('http');
var request  = require('request');

var APPID = process.env.APPID;
var WeatherKey = process.env.WeatherKey;
var SecretKey = process.env.SecretKey;
var template1 = process.env.template1;
var USERONE = process.env.USERONE;

var dailyWeather = require('./actions/dailyWeather');
var WechatAPI = require('wechat-api');
var api = new WechatAPI(APPID, SecretKey);

AV.Cloud.define('hello', function(request, response) {
  console.error('Hello world!');
  response.success('Hello world!');
});

AV.Cloud.define('noSleep', function(request, response) {
  http.get("http://robot.leanapp.cn/sleep", function(res) {
  console.error("Got response: " + res.statusCode);
  }).on('error', function(e) {
  console.error("Got error: " + e.message);
  });
  response.success('send no Sleep success');
});

AV.Cloud.define('dailyWeather', function(req, response) {
  var option = {
    url: 'http://api.thinkpage.cn/v3/weather/now.json',
    qs: {
      key: WeatherKey,
      location: 'shanghai',
      unit: 'c'
    }
  }
  request(option, sendWeather);
  response.success('send dailyWeather');
});

function sendWeather (error, res, body) {
  var resData = JSON.parse(body).results[0].now;
  var data = {
    "title": {
        "value":"天气预报",
        "color":"#173177"
    },
    "weather":{
        "value":resData.text,
        "color":"#173177"
    },
    "temperature": {
        "value":resData.temperature + "度",
        "color":"#173177"
    },
    "remark": {
        "value":"请及时参考",
        "color":"#173177"
    }
  }
  api.sendTemplate(USERONE, template1, '', data);
}

module.exports = AV.Cloud;
