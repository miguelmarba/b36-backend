const { Authors } = require('../models');

const createAuthor = (data) => Authors.create( data );
const getAllAuthors = () => Authors.find({
    is_active:true
}).populate({
    path: 'posts',
    model: 'posts'
});
const getOneAuthor = (id) => Authors.findById({ 
    _id:id, is_active:true
}).populate({
    path: 'posts',
    model: 'posts'
});
const deleteOneAuthor = (id) => Authors.findByIdAndUpdate({
     _id:id, 
     is_active:true
    }, {
        is_active: false
});
const updateAuthor = (id) => Authors.findByIdAndUpdate({
    _id:id,
    is_active:true,
}, {
    ...data,
}, {
    new: true // Get updated row
});
const getAuthorByEmail = (email) => Authors.findOne({email, is_active});

module.exports = {
    createAuthor,
    getAllAuthors,
    getOneAuthor,
    deleteOneAuthor,
    updateAuthor
};