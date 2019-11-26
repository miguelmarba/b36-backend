const { createPost } = require ('../../services/PostService');

const { getOneAuthor } = require ('../../services/AuthorService');

const createNewPost = async (_, { data}) => {
    const post = await createPost(data);
    const author = await getOneAuthor(data.author);
    author.post.push(post);
    return author;
}