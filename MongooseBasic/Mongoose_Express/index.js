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
app.use(express.urlencoded({extended: true}));

//respond with a page that contains all the products
app.get('/products', async (req,res)=>{
    //Get all the products
    const products = await Product.find({})
    //display index.ejs and pass all products as a parameter
    res.render('products/index', {products})
})

//respond with a form to create a new product
app.get('/products/new', (req, res)=>{
    res.render('products/new')
})

//catch the value of the form
app.post('/products', async (req,res)=>{
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
})

//respond with a details page for every product
app.get('/products/:id', async (req,res)=>{
    //destructure the response to get the iD
    const {id} = req.params;
    const product = await Product.findById(id);
    console.log(product);
    res.render('products/show', {product})

})


app.listen(3000, ()=>{
    console.log("APP IS LISTENING ON PORT 3000!")
})
