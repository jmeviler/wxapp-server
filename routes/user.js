var AV = require('leanengine');
var request = require('request');
var router = require('express').Router();
var logger = require('log4js').getLogger();

router.post('/add', function(req, res, next) {
  var params = req.body;
  var queryMember = new AV.Query('Member');
  queryMember.equalTo('nickName', params.nickName);
  queryMember.find().then(function(data) {
    if (data.length) {
      var updateMember = AV.Object.createWithoutData('Member', data[0].id);
      updateMember.save().then(function (updateMember) {
        updateMember.increment('count', 1);
        updateMember.fetchWhenSave(true);
        return updateMember.save();
      }).then(function (updateMember) {
        logger.debug(params.nickName, '---update memeber success');
      }, function (error) {
        logger.error(JSON.stringify(error), '---update memeber fail');
      });
    } else {
      var Member = AV.Object.extend('Member');
      var newMember = new Member();
      newMember.save(params).then(function(object) {
        logger.debug(params.nickName, '---save memver success');
      });
    }
  });

  res.send({});
});

router.post('/feedback', function(req, res, next) {
  var params = req.body;
  var Feedback = AV.Object.extend('Feedback');
  var newFeedback = new Feedback();
  newFeedback.save(params).then(function(object) {
    logger.debug(params.nickName, params.content, '---save feedback success');
  });

  res.send({});
});
module.exports = router;