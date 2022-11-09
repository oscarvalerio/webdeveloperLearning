// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/relationshipDemo', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Connection successful")
})
.catch(()=>{
    console.log("DB Error")
})

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    //If you want a one to many relationship add an array
    addresses: [
        {
            street: String,
            city: String,
            state: String,
            country: String
        }
    ]
})

const User = mongoose.model('User', userSchema);
const makeUser = async () => {
    const u = new User({
        first: 'Harry',
        last: 'Potter',

    })
    u.addresses.push({
        street: "123 Sesame Street",
        city: "Alabama",
        state: "Georgia",
        country: "USA"
    })
    const res = await u.save();
    console.log(res);

}

//create a function to add an address

const addAdress = async(id) => {
    const user = await User.findById(id);
    user.addresses.push({
        street: "123 Alabama Street",
        city: "Atlanta",
        state: "Georgia",
        country: "USA"
    })
    const res = await user.save();
    console.log(res);
}

makeUser();