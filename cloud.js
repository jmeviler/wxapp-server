var AV = require('leanengine');
var http = require('http');
var request  = require('request');

var weather = require('./actions/weather');

var APPID = process.env.APPID;
var baiduKey = process.env.baiduKey;
var SecretKey = process.env.SecretKey;
var template1 = process.env.template1;
var USERONE = process.env.USERONE;

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
  weather();
  response.success('send dailyWeather');
});

module.exports = AV.Cloud;
