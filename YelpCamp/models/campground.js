const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create mongo schema
const CampgroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String
});

//export schema
module.exports = mongoose.model('Campground', CampgroundSchema);