//Declare Express constants
const express = require('express');
const app = express();
const path = require('path');
// getting-started Mongo DB
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const AppError = require('./AppError');


//Import model
const Product = require('./models/product');

// getting-started Mongo DB
mongoose.connect('mongodb://localhost:27017/farmStand2', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo Connection successful")
    })
    .catch(() => {
        console.log("Mongo DB Error")
    })

//Express server code to start server connection
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

//create array for category
const categories = ['fruit', 'vegetable', 'dairy'];
//respond with a page that contains all the products
app.get('/products', wrapAsync(async (req, res, next) => {
    //Get all the products
    const products = await Product.find({})
    //display index.ejs and pass all products as a parameter
    res.render('products/index', { products })
}))

//respond with a form to create a new product
app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
})

//catch the value of the form
app.post('/products', wrapAsync(async (req, res, next) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
}))

//This wrapAync function will try and catch every method below that is 
//wrapped on it
function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}

//respond with a details page for every product
app.get('/products/:id', wrapAsync(async (req, res, next) => {
    //destructure the response to get the iD
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/show', { product })
}));

//respond with a form to edit new product
app.get('/products/:id/edit', async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        //Calling Next and adding error handling as a parameter
        return next(new AppError('The product was not found', 404));
    }
    res.render('products/edit', { product, categories })
})

app.put('/products/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${product._id}`);
}))

app.delete('/products/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
}))

//You can create functions to handle specific errors
const handleValidationError = (err) =>{
    console.dir(err);
    return(err);
}

//This function will print the error name in the console so we can know the type of error
app.use((err, req, res, next) => {
  console.log(err.name);
  if(err.name === 'ValidationError'){
    err = handleValidationError(err);
  }
  next(err);
})

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).send(message);
})

app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!")
})
