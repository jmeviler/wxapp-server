var AV = require('leanengine');
var request = require('request');
var router = require('express').Router();

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
        console.error(JSON.stringify(updateMember), 'update memeber success');
      }, function (error) {
        console.error(JSON.stringify(error), 'update memeber fail');
      });
    } else {
      var Member = AV.Object.extend('Member');
      var newMember = new Member();
      newMember.save(params).then(function(object) {
        console.error(JSON.stringify(object), '---save memver success');
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
    console.error(JSON.stringify(object), '---save feedback success');
  });

  res.send({});
});
module.exports = router;