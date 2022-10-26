const mongoose = require('mongoose');



const competenceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add name of competition'],
        unique: true,
        trim: false,
        maxlength: [40, 'cannot be more than 40 chars']
    },
    workplace: {
        type: mongoose.Schema.ObjectId,
        ref: 'workplace',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    group: String,
    createdBy: String,
    lastEdit: Date,
    lastEditBy: String,
    
});

module.exports = mongoose.model('competence', competenceSchema);