//############################################################################
//#####     FILE TO DELETE THE DB AND CREATE 50 CAMPGROUNDS
//############################################################################

const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedhelpers');

//connect with Mongo DB
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database Connected")
});

//create a name for the campGround
const sample = array => array[Math.floor(Math.random() * array.length)];

//Delete all info from the DB
const seedDB = async () => {
    await Campground.deleteMany({});
    //Create as many campgrounds as needed
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20)+10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251/',
            description: "Spicy jalapeno bacon ipsum dolor amet doner bacon kielbasa biltong, est cillum shoulder lorem consectetur pork chop non commodo consequat incididunt ullamco.",
            price: price

        })
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
})