/**
 * Created by fazbat on 2/24/2016.
 */
var http = require('http');
var url = require("url");
var api = require("./apis");
var express = require("express");
var app = express();



app.get("/", function (req, res) {
    res.send("index page");
});

app.get("/timestamp/*", function (req, res) {
    res.send(api.parsetime(req.params["0"]));
});

app.listen(process.env.PORT || 8081, function () {
    console.log('Example app listening on port 8081!');
});
