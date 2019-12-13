const { getAllAuthors, getOneAuthor } = require('../../services/AuthorService');

const getAuthors = async () => {
    const authors = await getAllAuthors();
    return authors;
}

// const getSingleAuthor = async (root, params, context, info) => {}
const getSingleAuthor = async (_, {id}) => {
    const author = await getOneAuthor(id);
    if(!author){
        throw new Error ('Author not exists');
    }
    return author;
}

const me = async (_, __, {user}) => {
    // const author = await getOneAuthor(user._id);
    return user;
};

module.exports = {
    getAuthors,
    getSingleAuthor,
    me,
}