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
        return res.end('invalid URL\n')
    }

});

server.listen(Number(process.argv[2]));

/*
Here's the official solution in case you want to compare notes:
─────────────────────────────────────────────────────────────────────────────

var http = require('http')
var url = require('url')
function parsetime (time) {
    return {
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds()
    }
}
function unixtime (time) {
    return { unixtime : time.getTime() }
}

var server = http.createServer(function (req, res) {
    var parsedUrl = url.parse(req.url, true)
    var time = new Date(parsedUrl.query.iso)
    var result

    if (/^\/api\/parsetime/.test(req.url))
        result = parsetime(time)
    else if (/^\/api\/unixtime/.test(req.url))
        result = unixtime(time)

    if (result) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(result))
    } else {
        res.writeHead(404)
        res.end()
    }
})
server.listen(Number(process.argv[2]))
*/