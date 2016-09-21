var rp = require('request-promise');
var WeatherKey = process.env.WeatherKey;
var constant = require('../constants/API');
var token = require('../actions/token');

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
    if (!GLOBAL.token) {
      token();
    }

    var options = {
    method: 'POST',
    uri: constant.sendCustomMsg + GLOBAL.token,
    body: {
      "touser": process.env.USERONE,
      "msgtype": "news",
      "news": {
        "articles": [
          {
            "title": "Happy Day",
            "description": "Is Really A Happy Day",
            "url": "URL",
            "picurl": "PIC_URL"
          },
          {
            "title": "Happy Day",
            "description": "Is Really A Happy Day",
            "url": "URL",
            "picurl": "PIC_URL"
          }
        ]
      }
    },
    json: true
  };
  rp(options)
    .then(function (parsedBody) {
      console.error(parsedBody);
    })
    .catch(function (err) {
        console.error(err);
    });

  })
  .catch(function (err) {
    console.error(err);
  });
}

module.exports = dailyWeather;