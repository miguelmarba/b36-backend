const { createContact, updateContact, deleteContact } = require('../../services/ContactService');

const authenticate = require('../../utils/authenticate');

const createNewContact = async (_, {data}) => {
    const contact = await createContact(data);
    return contact;
}

const updateOneContact = async (_, {id, data}) => {
    const contact = await updateContact(id, data);
    if(!contact){
        throw new Error('Contact not exists');
    }
    return 'Contact deleted';;
}

const deleteOneContact = async (_, {id}) => {
    const contact = await deleteContact(id);
    if(!contact){
        throw new Error('Contact not exists');
    }
}

module.exports = {
    createNewContact,
    updateOneContact,
    deleteOneContact
}