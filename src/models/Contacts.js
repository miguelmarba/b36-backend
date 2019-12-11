const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    first_name: {
        type: String,
        required: true
    }, 
    last_name: {
        type: String,
        required: true
    }, 
    acount_name: {
        type: String,
    },
    tittle: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    mobile: {
        type: String,
    },
    birth_date:{
        type: Date
    },
    country: {
        type: String,
    },
    city: {
        type: String,
    },
    address: {
        type: String,
    },
    profile_pic: {
        type: String,
    },
    tasks: {
        type: [Schema.Types.ObjectId],
        refer: 'tasks'
    },
    is_active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('contacts', ContactSchema)