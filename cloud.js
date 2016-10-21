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
  var options = {
    uri: 'https://api.weixin.qq.com/cgi-bin/token',
    qs: {
      grant_type: 'client_credential',
      appid: APPID,
      secret: SecretKey
    },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  };

  rp(options)
  .then(function (parsedBody) {
    GLOBAL.token = parsedBody.access_token;
  })
  .catch(function (err) {
    console.error(err);
  });
  console.error(GLOBAL.token);
  response.success(GLOBAL.token);
});

module.exports = AV.Cloud;
