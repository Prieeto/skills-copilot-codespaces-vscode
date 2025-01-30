// Create web server

var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');

var comments = [];git add comments.js

http.createServer(function(req, res) {
	var urlObj = url.parse(req.url, true);
	var pathname = urlObj.pathname;
	if (pathname == '/') {
		fs.readFile('./index.html', function(err, data) {
			if (err) {
				console.log(err);
				res.end('read file error');
			}
			res.end(data);
		});
	} else if (pathname == '/comment') {
		var comment = urlObj.query;
		comments.push(comment);
		res.end(JSON.stringify(comments));
	} else if (pathname == '/getComments') {
		var json = JSON.stringify(comments);
		res.end(json);
	} else {
		var filePath = '.' + pathname;
		if (filePath.indexOf('.css') != -1) {
			res.writeHead(200, {'Content-Type': 'text/css'});
		}
		fs.readFile(filePath, function(err, data) {
			if (err) {
				console.log(err);
				res.end('read file error');
			}
			res.end(data);
		});
	}
}).listen(3000, '