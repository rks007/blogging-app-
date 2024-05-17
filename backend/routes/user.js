const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRET = require('../config');
const userInput = require('../inputValidation/userValidation');
const { User, Blog } = require('../db/db');
const authMiddleware = require('../middlewares/authMiddleware');
const blogInput = require('../inputValidation/blogValidation');
const router = express.Router();

router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const parsedCredentials = userInput.safeParse({
        username, password, firstName, lastName
    })
    if(!parsedCredentials.success){
        return res.status(400).json({
            msg: "wrong inputs"
        })
    }

    try {
        const userExist = await User.findOne({
            username: username
        })
        if(userExist){
            return res.status(401).json({
                msg:"user already exist"
            })
        }
    
        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(password, salt);
    
        const newUser = await User.create({
            username: username,
            password: securePassword,
            firstName: firstName,
            lastName: lastName
        })
    
        const userId = newUser._id;
        
        const token = jwt.sign({userId}, JWT_SECRET);
    
        res.status(200).json({
            msg: "User created successfully",
            token: token
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }

})

router.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const parsedCredentials = userInput.safeParse({
        username, password
    })
    if(!parsedCredentials.success){
        return res.status(400).json({
            msg: "wrong inputs"
        })
    }

    try {
        const validUser = await User.findOne({
            username: username
        })
    
        if(!validUser){
            res.status(401).json({
                msg: "not a existing user, first signup"
            })
        }
    
        const isMatch = await bcrypt.compare(password, validUser.password);
        if (!isMatch) {
            return res.status(401).json({ 
                msg: "Invalid credentials" 
            });
        }
    
        const userId = validUser._id;
        const token = jwt.sign({userId}, JWT_SECRET);
        res.status(200).json({
            token: token
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }

})

router.post('/create', authMiddleware, (req, res) => {
    const title = req.body.title;
    const description = req.body.description;

    const parsedCredentials = blogInput.safeParse({
        title, description
    })
    if(!parsedCredentials.success){
        return res.status(401).json({
            msg: "wrong input"
        })
    }

    const newBlog = Blog.create({
        userId: req.userId,
        title: title,
        description: description
    })

    res.status(200).json({
        msg: "blog created successfully"
    })
})

module.exports = router;