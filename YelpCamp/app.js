const express = require('express');
//Path for ejs files
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const Joi = require('joi');
const {campgroundSchema} = require('./schemas.js')
const catchAsync = require('./utils/catchAsync');
const expressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const Campground = require('./models/campground');
const ExpressError = require('./utils/ExpressError');

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


//Backend validation middleware function
const validateCampground = (req, res, next) =>{
    const {error} = campgroundSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg,400);
    } else{
        //If no errors, then continue to the next middleware
        next();
    }
}

//Load the first page
app.get('/', (req, res) => {
    res.render("home");
});

//Index for all pages
app.get('/campgrounds',catchAsync( async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
}));

//Page to create a new campground
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

app.post('/campgrounds', validateCampground, catchAsync( async(req, res, next)=>{
        // if(!req.body.campground) throw new expressError('Invalid Campground Data', 400);
        const campground = new Campground(req.body.campground);
        await campground.save();
        res.redirect(`/campgrounds/${campground._id}`);
}))


//Show details of one campground
app.get('/campgrounds/:id',catchAsync( async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', {campground});
}));

//Edit details of one campground
app.get('/campgrounds/:id/edit', catchAsync( async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', {campground});
}));

app.put('/campgrounds/:id', validateCampground, catchAsync( async(req, res)=>{
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id,{...req.body.campground});
    res.redirect(`/campgrounds/${campground._id}`);
}));

//Delete the campground
app.delete('/campgrounds/:id', validateCampground, catchAsync( async(req, res)=>{
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
}));

//Function to return a 404 if the route does not match to a path declared before
//If no route matches then send 404 for all (*) the addresses 
app.all('*',(req, res, next)=>{
    next(new expressError('Page not Found', 404));
})

//Error handling function
app.use((err, req, res, next)=>{
    const {statusCode = 500,message= 'Something went wrong'} = err;
    //set a messgae in case it does not have it
    if(!err.message){
        err.message = 'Oh no, something failed in the process';
    }
    res.status(statusCode).render('error', {err});
})

//Start listening to server
app.listen(3000, () => {
    console.log("Serving on Port 3000");
})