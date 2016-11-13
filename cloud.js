var AV = require('leanengine');
var rp = require('request-promise');
var http = require('http');
var request  = require('request');

var APPID = process.env.APPID;
var baiduKey = process.env.baiduKey;
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
    url: 'http://api.map.baidu.com/telematics/v3/weather',
    qs: {
      ak: baiduKey,
      location: '上海',
      output: 'json'
    }
  }
  request(option, sendWeather);
  response.success('send dailyWeather');
});

function sendWeather (error, res, body) {
  console.error(error);
  var resData = JSON.parse(body);
  var tipt = resData.results[0].index[0];
  var weather = resData.results[0].weather_data[0];
  var data = {
    "date": {
      "value": weather.date,
      "color":"#173177"
    },
    "weather":{
      "value": weather.weather + ',' + weather.wind,
      "color":"#173177"
    },
    "temperature": {
      "value": weather.temperature,
      "color":"#173177"
    },
    "tips":{
      "value": tipt.tipt
    },
    "des":{
      "value": tipt.des,
      "color":"#173177"
    }
  }
  api.sendTemplate(USERONE, template1, '', data);
}

module.exports = AV.Cloud;
