const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

//@desc Register user
//@route POST /api/v1/auth/register
//@access Public
exports.register = asyncHandler(async (req, res, next) => {
   const { name, email, password } = req.body;

   const user = await User.create({ name, email, password });

   sendTokenResponse(user, 200, res);
});

//@desc Login user
//@route POST /api/v1/auth/login
//@access Public
exports.login = asyncHandler(async (req, res, next) => {
   //get email and password from req.body
   const { email, password } = req.body;

   //Check if passed email and password
   if (!email || !password) {
      return next(new ErrorResponse('Podaj email oraz hasło', 400));
   }

   //check for user
   const user = await User.findOne({ email }).select('+password');

   if (!user) {
      return next(new ErrorResponse('Nieprawidłowe dane', 401));
   }

   // check if entered password match with hashed password in database
   const isMatch = await user.matchPassword(password);

   if (!isMatch) {
      return next(new ErrorResponse('Nieprawidłowe dane', 401));
   }

   sendTokenResponse(user, 200, res);
});

// @desc      Log user out / clear cookie
// @route     GET /api/v1/auth/logout
// @access    Public
exports.logout = asyncHandler(async (req, res, next) => {
   res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
   });

   res.status(200).json({
      success: true,
      data: {},
   });
});

//Get loged user
exports.getMe = asyncHandler(async (req, res, next) => {
   if (!req.user) {
      return next(new ErrorResponse('Please log in', 400));
   }

   res.status(200).json({
      succes: true,
      user: req.user,
   });
});

// Get token form model, create cookie and send response.

const sendTokenResponse = (user, statusCode, res) => {
   //create token
   const token = user.getSignedJwtToken();
   const options = {
      expires: new Date(
         Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
   };

   if (process.env.NODE_ENV === 'production') {
      options.secure = true;
   }

   res.status(statusCode).cookie('token', token, options).json({
      succes: true,
      token,
   });
};
