const express = require('express');
const app = express();
//Path for ejs files
const path = require('path');

//Set ejs engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));


//Load the first page
app.get('/',(req,res)=>{
    res.render("home");
})

//Start listening to server
app.listen(3000, ()=>{
    console.log("Serving on Port 3000");
})