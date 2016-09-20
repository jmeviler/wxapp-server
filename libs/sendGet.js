var http  = require('http');

function sendGet(url, query) {
	console.error('======================' + constant.weather);
	http.get('http://api.thinkpage.cn/v3/weather/now.json?key=nwp5es1nmasm7a2y&location=shanghai&language=zh-Hans&unit=c',function(response){
		response.setEncoding('utf8');
		response.on('data', function(chunks){
			console.error(JSON.parse(chunks).results[0]);
		});	
	}).on('error',function(e){
		console.error("Got error: " + e.message);
	});
}

module.exports = sendGet;