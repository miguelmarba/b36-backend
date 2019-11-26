const {} = require('../../services/AuthorService')

const createNewAuthor = async (_, { data }) => {
    const author = await createAuthor(data);
    return author;
};

const updateOneAuthor = async (_, {id, data}) => {
    const author = await updateAuthor(id, data);
    if (!author){
        throw new Error ('Author not exists');
    }
}

const deleteOneAuthor = async (_, { id }) => {
    const author = await deleteAuthor(id);
    if (!author){
        throw new Error ('Author not exists');
    }
    return 'Author has been deleted';
}

module.exports = {
    createAuthor,
    updateOneAuthor
}