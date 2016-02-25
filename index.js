/**
 * Created by fazbat on 2/24/2016.
 */
var http = require('http');
var url = require("url");

function parsetime(iso){
    var date = new Date(iso);

    return JSON.stringify(
        {
            "hour": date.getHours(),
            "minute": date.getMinutes(),
            "second": date.getSeconds()
        }
    )
}

function unixtime(iso){
    var date = new Date(iso);

    return JSON.stringify(
        { "unixtime": date.getTime() }
    )
}

var server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var urlData = url.parse(req.url, true);

    if(urlData.pathname == '/api/parsetime'){
        res.end(parsetime(urlData.query.iso));
    }else if(urlData.pathname == '/api/unixtime'){
        res.end(unixtime(urlData.query.iso));
    }else{
        return res.end('Index Page');
    }

});

server.listen(process.env.PORT || 8081);
console.log('Server running at http://127.0.0.1:8081/');