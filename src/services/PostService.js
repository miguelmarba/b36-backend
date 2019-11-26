const Posts = require('../models/Posts');

const createPost = (data) => Posts.create(data);

module.exports = {
    createPost,
}