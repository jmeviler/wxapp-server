var request = require('request');

var options = {
  url: 'http://url/public/bus/Getstop',
  method: 'POST',
  form: {
    "stoptype": "0",
    "stopid": "25.",
    "sid": "bdaa9e802140ad0cf15c76d99297ea78"
  },
  headers: {
    "Accept":"*/*",
    "Accept-Encoding":"gzip, deflate",
    "Accept-Language":"en-US,en;q=0.8",
    "Connection":"keep-alive",
    "Cookie": "Hm_1vt_6f69830ae7173059e935b61372431b35=eSgsNFikGxaG5Ab8KyukAg==; Hm_lvt_6f69830ae7173059e935b61372431b35=1486717847; Hm_lpvt_6f69830ae7173059e935b61372431b35=1486717847; _gat=1; HH=70cc040d6b2c28f68b3a15fb9540bf4505aa1755; HK=a87c694d542f33784e9a4a6fd625f861ede7691c; HG=adeab5f44ae948a1ff6bf8242d200ae77817ebd3; HA=d4942dee8936b1369688ea656acabd19301aacfa; HB=ZDQ5NDJkZWU4OTM2YjEzNjk2ODhlYTY1NmFjYWJkMTkzMDFhYWNmYQ==; HC=ce0be704cde6463f27c33a7f193f5430e710856b; HD=MjAxNzAyMTU=;HY=MjAxNzAyMTU=a87c694d542f33784e9a4a6fd625f861ede7691cadeab5f44ae948a1ff6bf8242d200ae77817ebd3ef8c08809455b90289e5d52882cf2e56e59517c6; HO=TWpBeE56QXlNVFU9MTdOakV4TlRJPTExVFc5NmFXeHNZUzgxTGpBZ0tHbFFhRzl1WlRzZ1ExQlZJR2xRYUc5dVpTQlBVeUE1WHpFZ2JHbHJaU0JOWVdNZ1QxTWdXQ2tnUVhCd2JHVlhaV0pMYVhRdk5qQXhMakV1TkRZZ0tFdElWRTFNTENCc2FXdGxJRWRsWTJ0dktTQldaWEp6YVc5dUx6a3VNQ0JOYjJKcGJHVXZNVE5DTVRReklGTmhabUZ5YVM4Mk1ERXVNU0IzWldOb1lYUmtaWFowYjI5c2N5OHdMakV5TGpFek1EUXdNQ0JOYVdOeWIwMWxjM05sYm1kbGNpOTFibVJsWm1sdVpXUWdUR0Z1WjNWaFoyVXZlbWhmUTA0Z2QyVmlkbWxsZHk4d2VmOGMwODgwOTQ1NWI5MDI4OWU1ZDUyODgyY2YyZTU2ZTU5NTE3YzY=; Hm_p1vt_6f69830ae7173059e935b61372431b35=eSgsNFikG0GG5Ab8KyyYAg==; _ga=GA1.2.503691614.1487149847",
    "Host":"url",
    "Origin":"http://url",
    "Referer":"http://url/public/bus/mes/sid/bdaa9e802140ad0cf15c76d99297ea78",
    "User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1 wechatdevtools/0.12.130400 MicroMessenger/undefined Language/zh_CN webview/0",
    "X-Requested-With":"XMLHttpRequest"
  }
};

function callback(error, response, body) {
  var info = JSON.parse(body);
  console.error(info);
}

request(options, callback);