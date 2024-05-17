const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { Blog } = require('../db/db');
const blogInput = require('../inputValidation/blogValidation');
const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
    const response = await Blog.find({});
    res.status(200).json({
        allBlogs: response
    })
})

router.get('/myblogs', authMiddleware, async (req, res) => {
    const response = await Blog.find({
        userId: req.userId
    })

    res.status(200).json({
        myBlogs: response
    })
})

router.put('/update', authMiddleware, async (req, res) => {
    const blogId = req.body.blogId;
    const title = req.body.title;
    const description = req.body.description;

    const parsedCredentials = blogInput.safeParse({
        title, description
    })
    if(!parsedCredentials.success){
        return res.status(401).json({
            msg: "wrong inputs for title or description"
        })
    }

    await Blog.findByIdAndUpdate({
        _id: blogId,
    },{
        title: title,
        description: description
    })

    res.status(200).json({
        msg: "blog updated successfully"
    })
})

router.delete('/', authMiddleware, async (req, res) => {
    const blogId = req.body.blogId;

    await Blog.findOneAndDelete({
        _id: blogId
    })
    
    res.status(200).json({
        msg: "blog deleted successfully"
    })
})


module.exports = router;