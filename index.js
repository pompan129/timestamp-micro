/**
 * Created by fazbat on 2/24/2016.
 */
    "use strict";

var http        = require('http');
var url         = require("url");
var api         = require("./apis");
var express     = require("express");
var app         = express();
var mongoose    = require("mongoose");



//connect to mongoLab===========
mongoose.connect('mongodb://fazbat:pass2964@ds019078.mlab.com:19078/rest-api-tut');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));//check connection for errors
db.once('open', function() {
    console.log("connected to mongoLab")
});



//Routes=============
app.use(express.static('/'));
app.get("/", function (req, res) {
    res.sendFile('home.htm', { root: __dirname});
});

app.get("/timestamp/:iso", function (req, res) {
    res.send(api.parsetime(req.params.iso));
});

app.get("/whoami/", function (req, res) {
    res.send(api.whoami(req.headers));
});

app.get("/new/:href(*)", (req,res) => {

    api.urlShortener(req.params.href,res,function(urlObj){

        var resObj;
        if(urlObj.error_msg){resObj = urlObj; }
        else{resObj = {orig_url:urlObj.orig_url, short_url: "https://pompan129-apiproj.herokuapp.com/new/" + urlObj.short_url }}
        res.send(resObj);
    });

});

app.get("/imagesearch/:imageSearchString",(req,res)=>{
    api.imageSearch(req.params.imageSearchString,req.query.offset, function(objArray){
        console.log(objArray);
        res.send(objArray);
    })
});

app.get("/latest/imagesearch/",(req,res)=>{
    api.recentImageSearches(function(err,searches){
        if(err){
            console.log(err);
            res.send(err)
        }
        res.send(searches);
    })
});


//listen on port============
var server = app.listen(process.env.PORT || 8081,  function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("app listening at http://%s:%s", host, port)

});
