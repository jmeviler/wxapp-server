var request = require('request');
var router = require('express').Router();
var logger = require('log4js').getLogger();

router.get('/jsconfig', function(req, res, next) {
  var url = req.params.url;
  logger.debug(url, '---config url');
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