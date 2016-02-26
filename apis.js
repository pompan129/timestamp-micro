/**
 * Created by fazbat on 2/25/2016.
 */


module.exports = {
    parsetime: function(iso)
{
    var date = new Date(iso);

    return JSON.stringify(
        {
            "hour": date.getHours(),
            "minute": date.getMinutes(),
            "second": date.getSeconds()
        }
    )
},
unixtime: function(iso) {
    var date = new Date(iso);

    return JSON.stringify(
        {"unixtime": date.getTime()}
    )
}
};