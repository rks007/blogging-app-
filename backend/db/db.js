const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://rishabhkumarsingh94:23UzpdOdVjxaJFKP@cluster0.fc7lnvw.mongodb.net/blogging');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    }
})

const User = mongoose.model('User', UserSchema);

module.exports = {
    User
}