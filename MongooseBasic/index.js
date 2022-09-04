// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movieApp', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Connection successful")
})
.catch(()=>{
    console.log("DB Error")
})