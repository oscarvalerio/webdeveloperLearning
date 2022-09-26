const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create mongo schema
const CampgroundSchema = new Schema({
    title: String,
    price: String,
    description: String,
    location: String
});

//export schema
module.exports = mongoose.model('Campground', CampgroundSchema);