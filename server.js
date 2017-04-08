var express = require('express');
var port = process.env.PORT || 8080;
var app = express();

function extractSoftware(userAgent) {
	var start = userAgent.indexOf('(');	
	var end = userAgent.indexOf(')') + 1;
	return userAgent.slice(start, end);
}

app.get('/', function(req, res){
	res.set('Content-Type', 'application/json');
	var result = {
		ipaddress: null,
		language: null,
		software: null
	};
	result.ipaddress = req.ip;
	result.language = req.get('Accept-Language').split(',')[0];
	result.software = extractSoftware(req.get('User-Agent'));
	res.send(result);
	res.status(200).end();
});

app.listen(port, function(){
	console.log(`App listening at port: ${port}`);
});
