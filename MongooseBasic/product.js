// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Connection successful")
})
.catch(()=>{
    console.log("DB Error")
})

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: 20
    },
    price:{
        type: Number,
        required: true
    },
    onSale:{
        type: Boolean,
        default: false
    },
    categories:{
        type:[String], //An array of strings
        default:['cycling'] 
    }
})

const Product = mongoose.model('Product',productSchema);

const bike = new Product({name:'Suit Bike',price: 28.99,categories: ['cycling','Safety']})
bike.save().then(data => {
    console.log("IT WORKED!!");
    console.log(data);
}).catch(err => {
    console.log("ERROR");
    console.log(err);
})