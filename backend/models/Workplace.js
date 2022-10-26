const mongoose = require('mongoose');



const workplaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add name of competition'],
        unique: true,
        trim: false,
        maxlength: [40, 'cannot be more than 40 chars']
    },
    department: {
        type: mongoose.Schema.ObjectId,
        ref: 'department',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: String,
    lastEdit: Date,
    lastEditBy: String,
});

module.exports = mongoose.model('workplace', workplaceSchema);