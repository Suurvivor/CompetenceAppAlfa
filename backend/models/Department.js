const mongoose = require('mongoose');
//const Workplace = require('../models/Workplace');

const departmentSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, 'Please add name of competition'],
         unique: true,
         trim: false,
         maxlength: [40, 'cannot be more than 40 chars'],
      },
      createdAt: {
         type: Date,
         default: Date.now,
      },
      createdBy: {
         type: String,
      },
      lastEdit: Date,
      lastEditBy: String,
   },
   {
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
   }
);

//Reverse populate with virtuals
departmentSchema.virtual('Workplaces', {
   ref: 'workplace',
   localField: '_id',
   foreignField: 'department',
   justOne: false,
});

module.exports = mongoose.model('department', departmentSchema);
