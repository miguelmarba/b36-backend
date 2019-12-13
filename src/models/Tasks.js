const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    subject: {
        type: String,
        required: true
    }, 
    comments: {
        type: String,
        required: true,
    },
    due_date: {
        type: Date
    },
    priority:{
        type: String,
        enum: ['HIGH', 'NORMAL']
    },
    status:{
        type: String,
        enum: ['OPEN', 'CLOSED']
    },
    contact: {
        type: Schema.Types.ObjectId,
        ref: 'contacts'
    },
    document:{
        type: String
    },
    is_active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('tasks', TaskSchema);