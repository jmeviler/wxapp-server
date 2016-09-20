var AV = require('leanengine');

/**
 * 一个简单的云代码方法
 */
AV.Cloud.define('hello', function(request, response) {
  response.success('Hello world!');
});

AV.Cloud.define('test', function(request, response) {
  response.success('this is a Cloud function!');
});

module.exports = AV.Cloud;
