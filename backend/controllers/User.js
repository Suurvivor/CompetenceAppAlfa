const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

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
   const user = await User.findById(req.params.id);
   if (!user) {
      return next(new ErrorResponse(`Could not find user of id ${req.params.id}`, 400));
   }
   res.status(200).json({
      succes: true,
      data: user,
   });
});

//@desc update User
//@route PUT /api/v1/users/:id
//@access Private
exports.updateUser = asyncHandler(async (req, res, next) => {
   const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
   });
   if (!user) {
      return next(new ErrorResponse(`Could not find user of id ${req.params.id}`, 400));
   }
   res.status(200).json({
      succes: true,
      data: user,
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
