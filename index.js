/**
 * Created by fazbat on 2/24/2016.
 */
var http = require('http');
var url = require("url");
var api = require("./apis");
var express = require("express");
var app = express();


app.use(express.static('/'));
app.get("/", function (req, res) {
    res.sendFile('home.htm', { root: __dirname});
});

app.get("/timestamp/*", function (req, res) {
    res.send(api.parsetime(req.params["0"]));
});

app.get("/whoami/", function (req, res) {
    res.send(api.whoami(req));
});

var server = app.listen(process.env.PORT || 8081,  function () {

    var host = server.address().address
    var port = server.address().port

    console.log("app listening at http://%s:%s", host, port)

});
