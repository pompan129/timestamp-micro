/**
 * Created by fazbat on 2/24/2016.
 */
var http = require('http');
var url = require("url");
var api = require("./apis");



var server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var urlData = url.parse(req.url, true);

    if(urlData.pathname == '/api/parsetime'){
        res.end(api.parsetime(urlData.query.iso));
    }else if(urlData.pathname == '/api/unixtime'){
        res.end(api.unixtime(urlData.query.iso));
    }else{
        return res.end('Index Page');
    }

});

server.listen(process.env.PORT || 8081);
console.log('Server running at http://127.0.0.1:8081/');