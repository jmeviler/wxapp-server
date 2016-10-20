var rp = require('request-promise');
var moment = require('moment');

var WakaKey = process.env.WakaKey;

function token () {
  var options = {
    uri: 'https://wakatime.com/api/v1/users/current/summaries',
    qs: {
      start: moment().format("YYYY-MM-DD"),
      end: moment().format("YYYY-MM-DD"),
      api_key: WakaKey
    },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  };

  rp(options)
  .then(function (parsedBody) {
    GLOBAL.grand_total = parsedBody.data.grand_total;
    console.error(typeof parsedBody.data.grand_total);
  })
  .catch(function (err) {
    console.error(err);
  });
}

module.exports = token;