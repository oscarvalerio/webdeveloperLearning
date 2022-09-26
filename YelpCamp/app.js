const express = require('express');
//Path for ejs files
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');

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

const app = express();


//Set ejs engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//Load the first page
app.get('/', (req, res) => {
    res.render("home");
});

//Index for all pages
app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
});

//Show details of one campground
app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', {campground});
});


//Start listening to server
app.listen(3000, () => {
    console.log("Serving on Port 3000");
})