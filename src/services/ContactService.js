const { Contacts } = require('../models');

const createContact = (data) => Contacts.create( data );
const getAllContacts = () => Contacts.find({
    is_active:true
}).populate({
    path: 'tasks',
    model: 'tasks'
});
const getOneContact = (id) => Contacts.findById({ 
    _id:id, is_active:true
}).populate({
    path: 'tasks',
    model: 'tasks'
});
const deleteContact = (id) => Contacts.findByIdAndUpdate({
     _id:id, 
     is_active:true
    }, {
        is_active: false
});
const updateContact = (id, data) => Contacts.findByIdAndUpdate({
    _id:id,
    is_active:true,
}, {
    ...data,
}, {
    new: true // Get updated row
});
const getContactByEmail = (email) => Contacts.findOne({email, is_active});

module.exports = {
    createContact,
    getAllContacts,
    getOneContact,
    deleteContact,
    updateContact,
    getContactByEmail
};