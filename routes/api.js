var router = require('express').Router();
var request = require('request');

var baiduKey = process.env.baiduKey;
var expressAPI = process.env.expressAPI;
var busAPIOne = process.env.busAPIOne;
var busAPITwo = process.env.busAPITwo;
var busAPIThree = process.env.busAPIThree;

router.get('/weather', function(req, res, next) {
  var option = {
    url: 'http://api.map.baidu.com/telematics/v3/weather',
    qs: {
      ak: baiduKey,
      location: 'shanghai',
      output: 'json'
    }
  }

  request(option, function(error, response, body){
    var resData = JSON.parse(body);
    var tipt = resData.results[0].index[0];
    var weather = resData.results[0].weather_data[0];
    weather.tipt = tipt;
    res.send(weather);
  });
});

router.get('/express/:type/:postId', function(req, res, next){
  var type = req.params.type;
  var postId = req.params.postId;
  var option = {
    url: expressAPI,
    qs: {
      type: type,
      postid: postId
    }
  }

  request(option, function(error, response, body){
    res.send(JSON.parse(body));
  });
});

router.get('/bus/:name', function(req, res, next){
  var name = req.params.name;
  var option = {
    url: busAPIOne,
    qs: { name: name }
  }

  var busLine = {};
  request(option, function(error, response, body){
    console.error(response);
    body = JSON.parse(body);
    for(key in body) {
      busLine[key] = body[key].trim();
    }

    var op = {
      url: busAPITwo,
      qs: {
        name: busLine.line_name,
        lineid: busLine.line_id
      }
    }

    request(op, function(error, response, bd){
      bd = JSON.parse(bd);
      console.error(bd);
      bd.busLine = busLine;
      res.send(bd);
    });
  });
});

router.get('/busstop/:name/:lineid/:stopid/:direction', function(req, res, next){
  var name = req.params.name;
  var lineId = req.params.lineid;
  var stopId = req.params.stopid;
  var direction = req.params.direction;

  var option = {
    url: busAPIThree,
    qs: {
      name: name,
      lineid: lineId,
      stopid: stopId,
      direction: direction
    }
  }

  request(option, function(error, response, body){
    res.send(JSON.parse(body));
  });
});

router.get('/test', function(req, res, next){
  var options = {
    url: 'http://shanghaicity.openservice.kankanews.com/public/bus/Getstop',
    method: 'POST',
    form: {
      "stoptype": "0",
      "stopid": "28.",
      "sid": "bdaa9e802140ad0cf15c76d99297ea78"
    },
    headers: {
      // "Accept":"*/*",
      // "Accept-Encoding":"gzip, deflate",
      // "Accept-Language":"en-US,en;q=0.8",
      // "Connection":"keep-alive",
      // "Cookie":"_gat=1; Hm_p1vt_6f69830ae7173059e935b61372431b35=eSgsNFikSKqHeAcCLA73Ag==; _gscu_1404343399=86868522excy7e19; _gscs_1404343399=87161531ep563l45; _gscbrs_1404343399=1; Hm_lvt_ba907373475281ec79b64ad73e7c9a36=1486868523,1487161532; Hm_lpvt_ba907373475281ec79b64ad73e7c9a36=1487161532; Hm_1vt_6f69830ae7173059e935b61372431b35=eSgsNFikSMOHRQcAK8v+Ag==; Hm_lvt_6f69830ae7173059e935b61372431b35=1484570870,1486865066,1487161514; Hm_lpvt_6f69830ae7173059e935b61372431b35=1487161541; HH=23a7585e35a29341870c1a8c3b6e04cef4246657; HK=4fd85a5b595e54f6af68afa3ec3c47e7cd37abeb; HG=4510645f2d85d4fcd17b14d420561fb3bcfa3ff4; HA=3f6a87a8575a21e45e7a2c1ba91bddf13b310805; HB=M2Y2YTg3YTg1NzVhMjFlNDVlN2EyYzFiYTkxYmRkZjEzYjMxMDgwNQ==; HC=532cefec396e8301dd11750304c7594cdde103b2; HD=MjAxNzAyMTU=; HY=MjAxNzAyMTU=4fd85a5b595e54f6af68afa3ec3c47e7cd37abeb4510645f2d85d4fcd17b14d420561fb3bcfa3ff436c5289719b116ec8478a464f0542d8db3a67e23; HO=TWpBeE56QXlNVFU9MjBNVEV5TmpVPTI1VFc5NmFXeHNZUzgxTGpBZ0tHbFFhRzl1WlRzZ1ExQlZJR2xRYUc5dVpTQlBVeUE1WHpFZ2JHbHJaU0JOWVdNZ1QxTWdXQ2tnUVhCd2JHVlhaV0pMYVhRdk5qQXhMakV1TkRZZ0tFdElWRTFNTENCc2FXdGxJRWRsWTJ0dktTQldaWEp6YVc5dUx6a3VNQ0JOYjJKcGJHVXZNVE5DTVRReklGTmhabUZ5YVM4Mk1ERXVNU0IzWldOb1lYUmtaWFowYjI5c2N5OHdMakUwTGpFME1Ea3dNQ0JOYVdOeWIwMWxjM05sYm1kbGNpOTFibVJsWm1sdVpXUWdUR0Z1WjNWaFoyVXZlbWhmUTA0Z2QyVmlkbWxsZHk4dzM2YzUyODk3MTliMTE2ZWM4NDc4YTQ2NGYwNTQyZDhkYjNhNjdlMjM=; _ga=GA1.2.765580975.1486868517",
      // "Host":"shanghaicity.openservice.kankanews.com",
      // "Origin":"http://shanghaicity.openservice.kankanews.com",
      // "Referer":"http://shanghaicity.openservice.kankanews.com/public/bus/mes/sid/bdaa9e802140ad0cf15c76d99297ea78",
      // "User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1 wechatdevtools/0.14.140900 MicroMessenger/undefined Language/zh_CN webview/0",
      // "X-Requested-With":"XMLHttpRequest"
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate",
      "Accept-Language": "zh-CN,zh;q=0.8",
      "Connection": "keep-alive",
      "Cookie": "Hm_p1vt_6f69830ae7173059e935b61372431b35=eSgsNFikSKqHeAcCLA73Ag==; _gscu_1404343399=86868522excy7e19; _gscbrs_1404343399=1; Hm_lvt_ba907373475281ec79b64ad73e7c9a36=1486868523,1487161532; Hm_lpvt_ba907373475281ec79b64ad73e7c9a36=1487161532; Hm_1vt_6f69830ae7173059e935b61372431b35=eSgsNFikSMOHRQcAK8v+Ag==; Hm_lvt_6f69830ae7173059e935b61372431b35=1484570870,1486865066,1487161514; Hm_lpvt_6f69830ae7173059e935b61372431b35=1487161541; HH=23a7585e35a29341870c1a8c3b6e04cef4246657; HK=4fd85a5b595e54f6af68afa3ec3c47e7cd37abeb; HG=4510645f2d85d4fcd17b14d420561fb3bcfa3ff4; HA=3f6a87a8575a21e45e7a2c1ba91bddf13b310805; HB=M2Y2YTg3YTg1NzVhMjFlNDVlN2EyYzFiYTkxYmRkZjEzYjMxMDgwNQ==; HC=532cefec396e8301dd11750304c7594cdde103b2; HD=MjAxNzAyMTU=; HY=MjAxNzAyMTU=4fd85a5b595e54f6af68afa3ec3c47e7cd37abeb4510645f2d85d4fcd17b14d420561fb3bcfa3ff436c5289719b116ec8478a464f0542d8db3a67e23; HO=TWpBeE56QXlNVFU9MjBNVEV5TmpVPTI1VFc5NmFXeHNZUzgxTGpBZ0tHbFFhRzl1WlRzZ1ExQlZJR2xRYUc5dVpTQlBVeUE1WHpFZ2JHbHJaU0JOWVdNZ1QxTWdXQ2tnUVhCd2JHVlhaV0pMYVhRdk5qQXhMakV1TkRZZ0tFdElWRTFNTENCc2FXdGxJRWRsWTJ0dktTQldaWEp6YVc5dUx6a3VNQ0JOYjJKcGJHVXZNVE5DTVRReklGTmhabUZ5YVM4Mk1ERXVNU0IzWldOb1lYUmtaWFowYjI5c2N5OHdMakUwTGpFME1Ea3dNQ0JOYVdOeWIwMWxjM05sYm1kbGNpOTFibVJsWm1sdVpXUWdUR0Z1WjNWaFoyVXZlbWhmUTA0Z2QyVmlkbWxsZHk4dzM2YzUyODk3MTliMTE2ZWM4NDc4YTQ2NGYwNTQyZDhkYjNhNjdlMjM=; _ga=GA1.2.765580975.1486868517",
      "Host": "shanghaicity.openservice.kankanews.com",
      "Origin": "http://shanghaicity.openservice.kankanews.com",
      "Referer": "http://shanghaicity.openservice.kankanews.com/public/bus/mes/sid/bdaa9e802140ad0cf15c76d99297ea78",
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1 wechatdevtools/0.14.140900 MicroMessenger/undefined Language/zh_CN webview/0",
      "X-Requested-With": "XMLHttpRequest"
    }
  };

  request(options, function(error, response, body){
    console.error(error);
    console.error(response.statusCode)
    res.send(JSON.parse(body));
  });
});


module.exports = router;
