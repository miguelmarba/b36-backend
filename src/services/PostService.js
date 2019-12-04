const Posts = require('../models/Posts');

const createPost = async (data) => {
    const post = await Posts.create(data);
    const populatePost = await getOnePost(post._id);
    return populatePost;
};

const getOnePost = (id) => Posts.findOne({
    _id: id,
    is_active: true,
}).populate('author');

const getAllPosts = () => Posts.find({
    is_active: true
}).populate('author');

const updatePost = ( id, data ) => Posts.findOneAndUpdate({
    _id: id,
    is_active: true
},{
    ...data
}, {
    new: true
}).populate('author');

const deletePost = (id) => Posts.findOneAndUpdate({
    _id: id,
    is_active: true,
}, {
    is_active: false,
});

module.exports = {
    createPost,
    getOnePost,
    getAllPosts,
    updatePost,
    deletePost,
}