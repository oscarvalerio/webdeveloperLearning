// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movieApp', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Connection successful")
})
.catch(()=>{
    console.log("DB Error")
})

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
});

//the format is the name of the model (singluar and capital) and then the name of the schema
const Movie = mongoose.model('Movie',movieSchema);
/* const matrix1 = new Movie({
    title: 'Matrix',
    year: 1999,
    score: 9.5,
    rating: 'PG-15'
})
 */
Movie.insertMany([
    {title: 'Titanic', year:2000, score:9.0, rating: 'PG-19'},
    {title: 'Lord of the Rings', year:2005, score:9.2, rating: 'PG-13'},
    {title: 'Up', year:2000, score:8.0, rating: 'PG-13'},
    {title: 'Harry Potter and the Deathly Hollows', year:2015, score:9.9, rating: 'PG-15'},
]).then( data => {
    console.log("New Movies added");
    console.log(data);
})
