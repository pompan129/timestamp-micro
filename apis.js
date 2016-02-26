/**
 * Created by fazbat on 2/25/2016.
 */


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
        return JSON.stringify(
            {
                "ipaddress": req.ip
            }
        )
    }

};