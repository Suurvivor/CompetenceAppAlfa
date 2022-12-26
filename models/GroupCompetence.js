const mongoose = require('mongoose');

const GroupCompetence = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  workplaceId:{ 
    type: mongoose.Schema.ObjectId,
    ref: 'workplace',
    required: true
  },
  competenceListId: [{ 
    type: mongoose.Schema.ObjectId,
    ref: 'competence'
  }],
  competenceListIdWithRating: [],
  createdAt: {
      type: Date,
      default: Date.now
  },
  createdBy: {
      type: String,
      required: true
  },
  lastEdit: Date,
  lastEditBy: String,

});

module.exports = mongoose.model('groupcompetence', GroupCompetence);