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

    var data = parsedBody.results[0].now;
    var touser = [process.env.USERONE];

    for (var index = 0; index < touser.length; index++) {
      var options = {
        method: 'POST',
        uri: constant.sendCustomMsg + GLOBAL.token,
        body: {
          "touser": touser[index],
          "msgtype": "news",
          "news": {
            "articles": [
              {
                "picurl": 'http://exmail.leanapp.cn/images/header.jpg'
              },
              {
                  "title": "天气：" + data.text + ", 温度：" + + data.temperature +'度',
                  "picurl": 'http://exmail.leanapp.cn/images/'+ data.code +'.png'
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
    }
  })
  .catch(function (err) {
    console.error(err);
  });
}

module.exports = dailyWeather;
