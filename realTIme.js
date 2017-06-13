var request = require('request');
var async = require('async');
var ObjTree = require('objtree');
var busAPIThree = process.env.busAPIThree;
var detailUrl = process.env.busAPIFour;
var dispatchUrl = process.env.busAPISix;

var hugeArray = [busAPIThree, detailUrl, dispatchUrl]
async.eachSeries(hugeArray, function iterator(item, callback) {
  var option = {
    url: item,
    qs: { action: 'Three', name: '188路', lineid: '802111', stopid: '1605369872', direction: 0 }
  }

  request(option, function(error, response, body){
    if (response.statusCode !== 200) {
      callback(null, item);
    } else {
      var contentType = response.headers['content-type'].split(';')[0];
      if(contentType !== 'text/plain') {
        var xotree = new ObjTree();
        body = xotree.parseXML(body).result.cars.car;
      } else {
        body = JSON.parse(body).cars;
      }

      if (body[0].time !== 'null') {
        var result = {};
        if (contentType === 'text/html') {
          result.noCar = true;
        }
        result.cars = body;
        console.error(result);
      } else {
        callback(null, item);
      }
    }
  });

}, function done() {
  console.error('all done');
});