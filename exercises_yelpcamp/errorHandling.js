const express = require('express');
const morgan = require('morgan');

const app = express();

const AppError = require('./AppError');
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
    // res.send("SORRY YOUR PASSWORD IS INCORRECT");
    //throw new Error('Password Required!')
    throw new AppError('Password required', 401)
});

app.get('/', (req, res)=>{
    //Login the time of the request we got from the app.use method
    console.log(`REQUESTED DATE: ${req.requestTime}`);
    res.send('HOMEPAGE')
});

app.get('/error', (req,res)=>{
    chicken.fly();
})

app.get('/dogs', (req,res) =>{
    //Login the time of the request we got from the app.use method
    console.log(`REQUESTED DATE: ${req.requestTime}`);
    res.send('Woof Woof');
});

//If you want to verify the password in a specific page add it as callback
app.get('/secret',verifyPassword, (req,res)=>{
    res.send("My Secret is: I hate shower");
});

app.get('/admin', (req, res)=>{
    throw new AppError('You are not an admin ', 403);
})
//You can also define app.use to create a Not Found page
//Just define the function at the end of the code
app.use((req,res)=>{
    res.status(404).send("Page Not Found")
});


/* //Create a function to handle errors on express apps
app.use((err, req, res, next)=>{
    console.log("**********************");
    console.log("******Error***********")
    console.log("**********************")
    //To call the next middleware error handler, add err as parameter in Next call
    next(err)
}) */

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something Went Wrong' } = err;
    res.status(status).send(message)
})

app.listen(3000, ()=>{
    console.log('App is running on port 3000');
});