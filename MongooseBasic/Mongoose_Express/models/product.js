const mongoose = require('mongoose');

//Define DB model for product
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit','vegetable','dairy']
    }
})

//Compile DB model
const Product = mongoose.model('Product',productSchema);
//Export Model to be used somewhere else
module.exports = Product;
