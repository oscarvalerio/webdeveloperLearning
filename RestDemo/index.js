//Require and execute express
const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('views', path.join(__dirname,'views'))
app.set('view engine','ejs')

const comments = [
    {
        username: 'Todd',
        comment: 'lol thats so funny'
    },
    {
        username: 'Skyler',
        comment: 'I like my dog'
    },
    {
        username: 'Sk8erBoi',
        comment: 'Please delete your email todd'
    },
    {
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]

//Set the CRUD resources for the comments functionality
app.get('/comments',(req, res)=>{
    res.render('comments/index')
})

app.get('/tacos', (req, res)=> {
    res.send("GET /tacos response")
})

app.post('/tacos', (req, res)=> {
    const {meat,qty} = req.body;
    res.send(`Ok, here are your ${qty} ${meat} tacos`)
})

app.listen(3000, ()=> {
    console.log('Listening on port 3000')
}
)
