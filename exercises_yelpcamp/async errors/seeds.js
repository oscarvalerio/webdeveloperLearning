// getting-started Mongo DB
const mongoose = require('mongoose');
//Import model
const Product = require('./models/product');

// getting-started Mongo DB
mongoose.connect('mongodb://localhost:27017/farmStand2', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Mongo Connection successful")
})
.catch(()=>{
    console.log("Mongo DB Error")
})

const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Organic Celery',
        price: 1.50,
        category: 'vegetable'
    },
    {
        name: 'Chocolate Whole Milk',
        price: 2.69,
        category: 'dairy'
    }
]

Product.insertMany(seedProducts)
.then(res=>{
    console.log(res)
})
    .catch(e =>{
        console.log(e)
})
