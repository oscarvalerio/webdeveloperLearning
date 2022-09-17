//Declare Express constants
const express = require('express');
const app = express();
const path = require('path');
// getting-started Mongo DB
const mongoose = require('mongoose');

//Import model
const Product = require('./models/product');

// getting-started Mongo DB
mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Mongo Connection successful")
})
.catch(()=>{
    console.log("Mongo DB Error")
})

//Express server code to start server connection
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.get('/dog',(req,res)=>{
    res.send('Woof')
})

app.listen(3000, ()=>{
    console.log("APP IS LISTENING ON PORT 3000!")
})