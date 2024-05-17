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

const BlogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', UserSchema);
const Blog = mongoose.model('Blog', BlogSchema);

module.exports = {
    User,
    Blog
}