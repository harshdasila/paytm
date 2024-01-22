const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://harshdasila5555:Harsh%406112@cluster0.muz5vq8.mongodb.net/Paytm')

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    // accounts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Account'}]
});

const accountSchema = new mongoose.Schema({
    balance: {type: Number, required: true},
    userID:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
})

const User = mongoose.model('User',userSchema);
const Account  = mongoose.model('Account',accountSchema);

module.exports = {User,Account}