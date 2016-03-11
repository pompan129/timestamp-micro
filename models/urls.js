/**
 * Created by fazbat on 3/1/2016.
 */

"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Url = new Schema({
    orig_url: String,
    short_url: String
});

module.exports = mongoose.model('url', Url);