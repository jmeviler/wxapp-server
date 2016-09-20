var http = require('http');

function sendPost(params) {
	var params = JSON.stringify({
		"touser": "o_Pkcs2yIOUJHyapCbzK6WBjZha4", 
		"msgtype": "text", 
		"text": {
			"content": "Hello World"
		}
	});

	var options = {
		host: 'api.weixin.qq.com',
		port: 80,
		path: '/cgi-bin/message/custom/send?access_token=DAbuXiFp9Woj9S1PT1X4FNkkesCsbXSmg5D42Q48QMcKilvHi-rtUyPoPi8UokPTYZ8pYdF3Eb8sjw-Mu_SS4f7TjRl0yfSUxFbLmMv3DGx-KDMFRMRVXxUr1QGE_gJUZIFeAJAFOL',
		method: 'post',
		headers: {
			'Content-Type':'application/x-www-form-urlencoded',
			'Content-Length': params.length
		}
	};

	var req = http.request(options, function(res) {
		res.setEncoding('utf8');
		var _data="";
		res.on('data', function (chunk) {
			_data+=chunk;
			console.error('BODY: ' + chunk);
		});
		res.on('end', function(){
			console.error("REBOAK:",_data)
		});
		req.on('error', function(e) {
			console.error('problem with request: ' + e.message);
		});
	});

	req.write(params);
	req.end();
}

module.exports = sendPost;
