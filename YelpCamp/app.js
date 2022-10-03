const express = require('express');
//Path for ejs files
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
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

//Set ejs to use ejs-mate engine
app.engine('ejs',ejsMate);
//Set ejs engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Handle the data from the New form
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));


//Load the first page
app.get('/', (req, res) => {
    res.render("home");
});

//Index for all pages
app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
});

//Page to create a new campground
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

app.post('/campgrounds', async(req, res)=>{
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
})


//Show details of one campground
app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', {campground});
});

//Edit details of one campground
app.get('/campgrounds/:id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', {campground});
});

app.put('/campgrounds/:id', async(req, res)=>{
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id,{...req.body.campground});
    res.redirect(`/campgrounds/${campground._id}`);
});

//Delete the campground
app.delete('/campgrounds/:id', async(req, res)=>{
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
});

//Start listening to server
app.listen(3000, () => {
    console.log("Serving on Port 3000");
})