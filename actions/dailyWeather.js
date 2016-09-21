var rp = require('request-promise');
var WeatherKey = process.env.WeatherKey;

function dailyWeather () {
  var options = {
    uri: 'http://api.thinkpage.cn/v3/weather/now.json',
    qs: {
      key: WeatherKey,
      location: 'shanghai'
    },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  };

  rp(options)
  .then(function (parsedBody) {
    console.error(parsedBody)
  })
  .catch(function (err) {
    console.error(err);
  });
}

module.exports = dailyWeather;