"use strict";

const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
    title: String,
    artist: String,
    note: String,
    songUrl: String, 
    email: String
});

const musicModel = mongoose.model('music', musicSchema);

module.exports = {
    musicModel
}