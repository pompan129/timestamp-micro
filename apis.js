/**
 * Created by fazbat on 2/25/2016.
 */

var Url             = require("./models/urls.js");//url model for mongodb/mongoose
var Counter         = require("./models/counter.js");//counter model for mongodb/mongoose
var validator       = require('validator');

module.exports = {

    parsetime: function(iso){
        var months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL","MAY", "JUNE", "JULY", "AUGUST",
            "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

        var date = isNaN(iso)? new Date(iso): new Date(Number(iso));
        var natural = date.getTime() !== null? "" + months[date.getUTCMonth()] + " " +
                                date.getUTCDate() +", " + date.getUTCFullYear(): null;
        return JSON.stringify(
            {
                "unix": date.getTime(),
                "natural": natural
            }
        )
    },

    whoami: function(headers){
        return JSON.stringify(
            {
                "ipaddress": headers["x-forwarded-for"],
                "language":headers["accept-language"].split(",")[0],
                "software":headers["user-agent"].match(/\(([^)]+)\)/)[1]
            }
        )
    },

    urlShortener: function(href,res,callback){

        if(validator.isURL(href)){
            /*test all urls for http:// or https://. Add if they are missing for database storage*/
            var hasHttp =  /^(https?:\/\/)/i.test(href);
            if(!hasHttp){href = "http://" + href}

            /*search in database for URL. */
            Url.findOne({orig_url:href}, function(err,result){
                if(err){res.send(err); console.log(err);}

                if(result){
                    callback(result); //return
                }else{
                    this.createURL(href, callback);
                }
            }.bind(this));
        }else if(this.isHex(href)){
            Url.findOne({short_url:href}, function(err,result){
                if(err){res.send(err); console.log(err);}

                if(result){
                    res.redirect(result.orig_url);
                }else{
                    callback({error_msg:"No Matching 'short_url' found"});
                }
            }.bind(this));
        }else{
            callback({error_msg:"Not Valid URL"});
        }
    },
    createURL: function(href,callback){
        var newUrl;
        this.getNextSequenceValue(function(err,doc){
            newUrl = new Url({
                orig_url: href,
                short_url: doc.count.toString(16)
            });
            newUrl.save().then(function(url){
                callback(url);
            });

        });
    },
    getNextSequenceValue:   function(callback){
        Counter.findOneAndUpdate({"name":"url-count"}, {$inc:{count:1}},{new:true},callback);
    },
    isHex: function(h) {
    var a = parseInt(h,16);
    return (a.toString(16) === h)
    }


};