const { createPost, updatePost, deletePost } = require ('../../services/PostService');

const { getOneAuthor } = require ('../../services/AuthorService');

const storage = require('../../utils/storage');

const createNewPost = async (_, { data }, { user }) => {
    data.author = user._id;
    if(data.cover) {
        const { createReadStream } = await data.cover;
        const stream = createReadStream();
        const image = await storage({ stream });
        data = {
            ...data,
            cover: image.url,
        };
    }
    const post = await createPost(data);
    user.posts.push(post);
    user.save();
    return post;
};

const updateOnePost = async (_, { id, data }, { user }) => {
    data.author = user._id;
    if(data.cover) {
        const {
            createReadStream
        } = await data.cover;
        const stream = createReadStream();
        const image = await storage({
            stream
        });
        data = {
            ...data,
            cover: image.url,
        };
    }
    const post = await updatePost(id, data);
    if(!post) throw new Error('Post not exists');
    return post;
};

const deleteOnePost = async (_, {id}) => {
    const post = await deletePost(id);
    if(!post) throw new Error('Post not exists');
    return 'Post deleted';
};

module.exports = {
    createNewPost,
    updateOnePost,
    deleteOnePost
};