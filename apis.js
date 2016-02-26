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
    whoami: function(req){
        console.log(req.ips);
        return JSON.stringify(
            {
                "ipaddress": req.ips[0] || req.ip,
                "language":req.get("Accept-Language").split(",")[0],
                "software":os.platform()
            }
        )
    }

};