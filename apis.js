/**
 * Created by fazbat on 2/25/2016.
 */
var os = require('os');

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
        console.log(JSON.stringify(headers));
        return JSON.stringify(
            {
                "ipaddress": headers["x-forwarded-for"],
                "language":headers["accept-language"].split(",")[0],
                "software":headers["user-agent"].match(/\(([^)]+)\)/)[1]
            }
        )
    }

};