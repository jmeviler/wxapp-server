var AV = require('leanengine');
var token = require('./actions/token');
var dailyWeather = require('./actions/dailyWeather');

AV.Cloud.define('hello', function(request, response) {
  console.error('Hello world!');
  response.success('Hello world!');
});

AV.Cloud.define('dailyWeather', function(request, response) {
  dailyWeather();
});

AV.Cloud.define('token', function(request, response) {
  token();
});

module.exports = AV.Cloud;
