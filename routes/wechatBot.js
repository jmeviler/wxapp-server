var router = require('express').Router();
var logger = require('log4js').getLogger();

var rp = require('request-promise');
var wechat = require('wechat');
var token = require('../actions/token');
var wakatime = require('../actions/wakatime');
var weather = require('../actions/weather');

var TOKEN = process.env.TOKEN;
var APPID = process.env.APPID;
var EncodingAESKey = process.env.EncodingAESKey;
var SecretKey = process.env.SecretKey;
var TuLingAPIKey = process.env.TuLingAPIKey;

var config = {
  token: TOKEN,
  appid: APPID,
  encodingAESKey: EncodingAESKey
};

var WechatAPI = require('wechat-api');
var api = new WechatAPI(APPID, SecretKey);

router.use('/', wechat(config.token).text(function (message, req, res, next) {
  var content = message.Content;
  if (content === 'token') {
    api.getLatestToken(function (err, data, res) {
      logger.debug(JSON.stringify(data));
    });
    return;
  }

  if (content === 'waka') {
    wakatime();

    res.reply({
      type: "text",
      content: GLOBAL.grand_total
    });
    return;
  }

  var options = {
    method: 'POST',
    uri: 'http://www.tuling123.com/openapi/api',
    body: {
      "key": TuLingAPIKey,
      "info": content,
      "loc": "上海市浦东新区"
    },
    json: true
  };

  rp(options)
    .then(function (parsedBody) {
      res.reply({
        type: "text",
        content: parsedBody.text
      });
    })
    .catch(function (err) {
      console.error(err);
    });
}).middlewarify());

module.exports = router;
