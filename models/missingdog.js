'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var missingDogSchema = Schema({
    name: String,
    address: String,
    breed: String,
    image: String,
    time: Date,
});

module.exports = mongoose.model('missingDog', missingDogSchema);
