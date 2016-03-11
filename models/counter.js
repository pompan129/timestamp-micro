/**
 * Created by fazbat on 3/10/2016.
 */


"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Counter = new Schema({
    name: String,
    count: Number
});

module.exports = mongoose.model('counter', Counter);
