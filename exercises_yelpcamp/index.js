const express = require('express');
const morgan = require('morgan');

const app = express();

//app.use(morgan('common'));

app.use((req, res, next)=>{
    req.requestTime = Date.now();
    console.log(req.method);
    next();
});

app.get('/', (req, res)=>{
    //Login the time of the request we got from the app.use method
    console.log(`REQUESTED DATE: ${req.requestTime}`);
    res.send('HOMEPAGE')
});

app.get('/dogs', (req,res) =>{
    //Login the time of the request we got from the app.use method
    console.log(`REQUESTED DATE: ${req.requestTime}`);
    res.send('Woof Woof');
});

app.listen(3000, ()=>{
    console.log('App is running on port 3000');
});