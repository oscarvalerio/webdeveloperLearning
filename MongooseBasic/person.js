// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Connection successful")
})
.catch(()=>{
    console.log("DB Error")
})

//create DB Schema
const personSchema = new mongoose.Schema({
    first: String,
    last: String
})

//Create Virtual
personSchema.virtual('fullName').get(function(){
    return `${this.first} ${this.last}`
})

//Create Model
const Person = mongoose.model('Person',personSchema);