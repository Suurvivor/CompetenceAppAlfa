const mongoose = require('mongoose');

const PlaningTraining = new mongoose.Schema({
   competenceId: {
      type: mongoose.Schema.ObjectId,
      ref: 'competence',
      required: true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
   createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
      required: true,
   },
   trainedUserId: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
      required: true,
   },
   trainingDate: {
      type: Date,
      required: true,
   },
   lastEdit: Date,
   lastEditBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
   },
});

module.exports = mongoose.model('planingtraining', PlaningTraining);
