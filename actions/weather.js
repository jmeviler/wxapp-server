var request  = require('request');

var APPID = process.env.APPID;
var baiduKey = process.env.baiduKey;
var SecretKey = process.env.SecretKey;
var template1 = process.env.template1;
var USERONE = process.env.USERONE;

var WechatAPI = require('wechat-api');
var api = new WechatAPI(APPID, SecretKey);

var option = {
  url: 'http://api.map.baidu.com/telematics/v3/weather',
  qs: {
    ak: baiduKey,
    location: 'shanghai',
    output: 'json'
  }
}

function weather () {
  request(option, sendWeather);
}

function sendWeather (error, res, body) {
  var resData = JSON.parse(body);
  var tipt = resData.results[0].index[0];
  var weather = resData.results[0].weather_data[0];
  var data = {
    "date": {
      "value": weather.date,
      "color":"#173177"
    },
    "weather":{
      "value": weather.weather + ', ' + weather.wind,
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
  api.sendTemplate(USERONE, template1, '', data, sendCallBack);
}

function sendCallBack (err, result) {
  console.error(err);
  console.error(result);
}

module.exports = weather;
