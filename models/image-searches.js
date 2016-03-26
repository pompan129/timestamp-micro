/**
 * Created by fazbat on 3/24/2016.
 */
"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ImageSearch = new Schema({
    term: String,
    when: Date
});

module.exports = mongoose.model('image_search', ImageSearch);
