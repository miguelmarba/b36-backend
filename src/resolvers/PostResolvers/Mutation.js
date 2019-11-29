const { createPost } = require ('../../services/PostService');

const { getOneAuthor } = require ('../../services/AuthorService');

const storage = require('../../utils/storage');

const createNewPost = async (_, { data}, { user }) => {
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
    const author = await getOneAuthor(data.author);
    author.posts.push(post);
    author.save();
    return post;
}