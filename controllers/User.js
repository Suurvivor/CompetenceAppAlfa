const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const PlaningTraining = require('../models/PlaningTraining');

//@desc Create user
//@route POST /api/v1/users
//@access Private
exports.addUser = asyncHandler(async (req, res, next) => {
   const newUser = await User.create(req.body);
   res.status(201).json({
      succes: true,
      data: newUser,
   });
});

//@desc Get all Users
//@route Get /api/v1/users
//@access Private
exports.getUsers = asyncHandler(async (req, res, next) => {
   res.status(200).json(res.advancedResults);
});

//@desc Get User
//@route Get /api/v1/users/:id
//@access Private
exports.getUser = asyncHandler(async (req, res, next) => {
   const user = await User.findById(req.params.id).populate({
      path: 'workplace',
      populate: {
         path: 'department',
      },
   });
   if (!user) {
      return next(new ErrorResponse(`Could not find user of id ${req.params.id}`, 400));
   }

   const planedTrainingForUsers = await PlaningTraining.find({ createdBy: user._id })
      .populate({
         path: 'competenceId',
         select: 'name workplace',
      })
      .populate({ path: 'createdBy', select: '_id name' })
      .populate({ path: 'trainedUserId', select: '_id name' })
      .sort({ trainingDate: 1 });

   const planedTraining = await PlaningTraining.find({ trainedUserId: user._id })
      .populate({
         path: 'competenceId',
         select: 'name workplace',
      })
      .populate({ path: 'createdBy', select: '_id name' })
      .populate({ path: 'trainedUserId', select: '_id name' })
      .sort({ trainingDate: 1 });

   const compiled = planedTraining.concat(planedTrainingForUsers);
   const sorted = compiled.sort((a, b) => {
      return new Date(a.trainingDate) - new Date(b.trainingDate);
   });
   const data = { ...user._doc, planedTraining: sorted };
   res.status(200).json({
      succes: true,
      data: data,
   });
});

//@desc update User
//@route PUT /api/v1/users/:id
//@access Private
exports.updateUser = asyncHandler(async (req, res, next) => {
   const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
   }).populate({
      path: 'workplace',
      populate: {
         path: 'department',
      },
   });
   if (!user) {
      return next(new ErrorResponse(`Could not find user of id ${req.params.id}`, 400));
   }

   let planedTrainingForUsers = null;
   if (req.user.role == 'trainer') {
      console.log('trener');
      planedTrainingForUsers = await PlaningTraining.find({ createdBy: user._id })
         .populate({
            path: 'competenceId',
            select: 'name workplace',
         })
         .sort({ trainingDate: 1 });
   }
   const planedTraining = await PlaningTraining.find({ trainedUserId: user._id })
      .populate({
         path: 'competenceId',
         select: 'name workplace',
      })
      .sort({ trainingDate: 1 });
   const data = { ...user._doc, planedTraining, planedTrainingForUsers };
   res.status(200).json({
      succes: true,
      data: data,
   });
});

//@desc Delete User
//@route Get /api/v1/users/:id
//@access Private
exports.deleteUser = asyncHandler(async (req, res, next) => {
   const user = await User.findByIdAndDelete(req.params.id);
   if (!user) {
      return next(new ErrorResponse(`Could not find user of id ${req.params.id}`, 400));
   }
   res.status(200).json({
      succes: true,
      data: [],
   });
});
