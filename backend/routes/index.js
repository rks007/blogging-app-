const express = require('express');

const router = express.Router();

const userRouter = require('./user');
const blogRouter = require('./blog');

router.use('/user', userRouter);
router.use('/blog', blogRouter);

module.exports = router;