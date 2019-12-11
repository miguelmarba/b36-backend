const { getAllContacts, getOneContact } = require('../../services/ContactService');

const getContacts = async () => {
    const contacts = await getAllContacts();
    return contacts;
}

const getSingleContact = async (_, {id}) => {
    const contact = await getOneContact(id);
    if(!contact){
        throw new Error('Contact not exists');
    }
    return contact;
}

module.exports = {
    getContacts,
    getSingleContact
}

