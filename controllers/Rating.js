const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const Competence = require('../models/Competence');

//@desc Add rating for competence by user or update if existsalready
//@route POST /api/v1/competences/:competenceid/rating/:userid
//@access Private
exports.addRating = asyncHandler(async (req, res, next) => {
   const competence = await Competence.findById(req.params.competenceid);
   if (!competence) {
      return next(new ErrorResponse(`Could not find Competence of id ${req.params.competenceid}`));
   }

   const user = await User.findById(req.params.id);
   if (!user) {
      return next(new ErrorResponse(`Could not find user of id ${req.params.id}`));
   }

   const ratingData = {
      competence_id: req.params.competenceid,
      rating: req.body.rating,
      lastmodify: null,
      lastmodify_by: null,
      created_at: Date.now(),
      created_by: req.user,
   };
   let pulledDataFromCallBack = '';
   const test = await user.addNewRatingOrUpdateIfExists(req.params.competenceid, ratingData, req.user, function (data) {
      pulledDataFromCallBack = data;
   });

   console.log(pulledDataFromCallBack.rating);

   res.status(201).json({
      succes: true,
      data: pulledDataFromCallBack,
   });
});
