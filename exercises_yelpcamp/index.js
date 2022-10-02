const express = require('express');
const morgan = require('morgan');

const app = express();

//app.use(morgan('common'));

app.use((req, res, next)=>{
    req.requestTime = Date.now();
    console.log(req.method);
    next();
});

//You can use the method USE to run on a specific path too
app.use('/dogs',(req,res,next)=>{
    console.log("I Love Dogs");
    next();
});

const verifyPassword= ((req,res,next)=>{
    //Get the query string from the browser
    const { password } = req.query;
    //If the password is the same as expected, then continue
    //Else, send an error
    if(password==="chickennugget"){
        next()
    }
    res.send("SORRY YOUR PASSWORD IS INCORRECT");
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

//If you want to verify the password in a specific page add it as callback
app.get('/secret',verifyPassword, (req,res)=>{
    res.send("My Secret is: I hate shower");
});

//You can also define app.use to create a Not Found page
//Just define the function at the end of the code
app.use((req,res)=>{
    res.status(404).send("Page Not Found")
});

app.listen(3000, ()=>{
    console.log('App is running on port 3000');
});