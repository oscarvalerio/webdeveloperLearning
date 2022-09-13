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

productSchema.methods.greet = function(){
    console.log("Hello");
    console.log(` -- from ${this.name}`);
}

//Update properties of an object found
productSchema.methods.toggleOnSale = function (){
    this.onSale = !this.onSale;
    return this.save();
}

//static method declaration
productSchema.statics.fireSale = function (){
    return this.updateMany({},{onSale: true, price: 9.99})
}

const Product = mongoose.model('Product',productSchema);

const findProduct = async ()=>{
   const foundProduct = await Product.findOne({name: 'Bike Helmet'});
   foundProduct.greet();
   console.log(foundProduct);
   await foundProduct.toggleOnSale();
   console.log(foundProduct);
}

findProduct();
Product.fireSale().then(res => console.log(res));

const bike = new Product({name:'pedals original',price: 13.99,categories: ['cycling','Sports']})
bike.save().then(data => {
    console.log("IT WORKED!!");
    console.log(data);
}).catch(err => {
    console.log("ERROR");
    console.log(err);
})