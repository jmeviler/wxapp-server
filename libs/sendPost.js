var http = require('http');

function sendPost(params, options) {
	var req = http.request(options, function(res) {
		res.setEncoding('utf8');
		var _data="";
		res.on('data', function (chunk) {
			_data+=chunk;
			console.error('BODY: ' + chunk);
		});
		res.on('end', function(){
			console.error("REBOAK:",_data);
		});
	});
	
	req.on('error', function(e) {
		console.error('problem with request: ' + e.message);
	});

	req.write(params);
	req.end();
}

module.exports = sendPost;
