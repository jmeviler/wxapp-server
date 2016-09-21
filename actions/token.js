var rp = require('request-promise');

var APPID = process.env.APPID;
var SecretKey = process.env.SecretKey;

function token () {
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
}

module.exports = token;