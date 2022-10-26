const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add name of competition'],
        unique: true,
        trim: false,
        maxlength: [40, 'cannot be more than 40 chars']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: String,
    },
    lastEdit: Date,
    lastEditBy: String,

});

module.exports = mongoose.model('department', departmentSchema);