// create web server
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var comments = [];

var server = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true);
    var pathName = urlObj.pathname;
    if (pathName === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), function (err, data) {
            if (err) {
                console.log(err);
                res.writeHead(500, {
                    'Content-Type': 'text/html'
                });
                res.end('500 Internal Server Error');
            }
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(data);
        });
    } else if (pathName === '/comment') {
        var comment = urlObj.query;
        comment.dateTime = new Date();
        comments.unshift(comment);
        res.statusCode = 301;
        res.setHeader('Location', '/');
        res.end();
    } else if (pathName === '/getComments') {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(comments));
    } else {
        fs.readFile(path.join(__dirname, pathName), function (err, data) {
            if (err) {
                console.log(err);
                res.writeHead(404, {
                    'Content-Type': 'text/html'
                });
                res.end('404 Not Found');
            }
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(data);
        });
    }
});

server.listen(3000, '');