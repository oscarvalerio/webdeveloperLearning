// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/relationshipDemo', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Connection successful")
})
.catch(()=>{
    console.log("DB Error")
})

//Define child model
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer','Fall','Winter']
    }
});

const {Schema} = mongoose;
const farmSchema = new Schema({
    name: String,
    city: String,
    //Declaring an array of Objects with a reference of the type of the Model declared above
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});
/* 
Product.insertMany([
    {name:'Goddes Melon',price:4.99,season:'Summer'},
    {name:'Sugar Melon',price:14.99,season:'Summer'},
    {name:'Water Melon',price:23.99,season:'Fall'},
    {name:'Chinese Melon',price:6.99,season:'Winter'},
]) */
const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm',farmSchema);


const makeFarm = async() =>{
    const farm = new Farm({name: 'FUll Belly farm', city: 'Guindo, CA',});
    const melon = await Product.findOne({name: 'Chinese Melon'});
    farm.products.push(melon);
    await farm.save();
    console.log(farm);
};

Farm.findOne({name:'FUll Belly farm"'})
.populate('products')
.then(farm => console.log(farm));