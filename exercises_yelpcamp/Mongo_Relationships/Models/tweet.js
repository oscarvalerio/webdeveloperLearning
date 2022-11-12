// getting-started.js
const mongoose = require('mongoose');
const {Schema} = mongoose;

mongoose.connect('mongodb://localhost:27017/relationshipDemo', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Connection successful")
})
.catch(()=>{
    console.log("DB Error")
})

//Define parent model
const userSchema = new Schema({
    username: String,
    age: Number
});

//Define child model
const tweetSchema = new Schema({
    text: String,
    likes: Number,
    //Adding a reference to the parent Schema
    user: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

//create an user
/* const makeTweets = async() =>{
    const user = await User.findOne({username:'chickenfan99'});
    const tweet2 = new Tweet({text:'bock bock bock my chickens make noises', likes: 10});
    tweet2.user = user;
    user.save();
    tweet2.save();
}
 */

const findTweet = async ()=>{
    const t = await Tweet.findOne({}).populate('user');
    console.log(t);
}

findTweet();