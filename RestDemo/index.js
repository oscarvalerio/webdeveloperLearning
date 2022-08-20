//Require and execute express
const express = require('express');
const app = express();
const path = require('path');
//require UUID to generate unique IDs
const { v4: uuid } = require('uuid');

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol thats so funny'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like my dog'
    },
    {
        id: uuid(),
        username: 'Sk8erBoi',
        comment: 'Please delete your email todd'
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]

//Set the CRUD resources for the comments functionality
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})

//GET and POST requests to use in the form
app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})

app.post('/comments', (req, res) => {
    const {username , comment} = req.body;
    comments.push({username, comment, id: uuid()})
    res.redirect('/comments')
})

//Create request to get an specific comment by ID
app.get('/comments/:id', (req,res)=>{
    //We can take the ID parameter from the URL by using this sentence
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment })

})

//Update a comment by ID
app.patch('/comments/:id',(req, res) => {
    //Get the ID from comment
    const {id} = req.params;
    const newComment = req.body.comment;
    //Find comment
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newComment;
    res.redirect('/comments')
})

app.get('/tacos', (req, res) => {
    res.send("GET /tacos response")
})

app.post('/tacos', (req, res) => {
    const { meat, qty } = req.body;
    res.send(`Ok, here are your ${qty} ${meat} tacos`)
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
}
)
