var AV = require('leanengine');
var sendGet = require('./libs/sendGet');
var sendPost = require('./libs/sendPost');

/**
 * 一个简单的云代码方法
 */
AV.Cloud.define('hello', function(request, response) {
  sendGet();
  response.success('Hello world!');
});

AV.Cloud.define('dailyWeather', function(request, response) {
  
});

module.exports = AV.Cloud;
