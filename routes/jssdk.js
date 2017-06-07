var request = require('request');
var router = require('express').Router();
var logger = require('log4js').getLogger();
var wechat = require('wechat');

var TOKEN = process.env.TOKEN;
var APPID = process.env.APPID;
var EncodingAESKey = process.env.EncodingAESKey;
var SecretKey = process.env.SecretKey;

var config = {
  token: TOKEN,
  appid: APPID,
  encodingAESKey: EncodingAESKey
};

var WechatAPI = require('wechat-api');
var api = new WechatAPI(APPID, SecretKey);

router.get('/jsconfig', function(req, res, next) {
  var param = {
    debug: false,
    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
    url: 'http://robot.leanapp.cn'
  };
  if (!api.getLatestTicket()) {
    api.getTicket();
  }
  logger.debug(api.getLatestTicket(), '--- last ticket');
});

module.exports = router;