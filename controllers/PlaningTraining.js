const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const PlaningTraining = require('../models/PlaningTraining');
const Competence = require('../models/Competence');
const User = require('../models/User');

exports.getPlanedTraining = asyncHandler(async (req, res, next) => {
   let userid = null;
   if (req.params.userid) {
      userid = req.params.userid;
   } else {
      userid = req.user.id;
   }

   const planedTrainingForUsers = await PlaningTraining.find({ createdBy: userid })
      .populate({
         path: 'competenceId',
         select: 'name workplace',
      })
      .populate({
         path: 'createdBy',
         select: '_id name workplace',
         populate: { path: 'workplace', select: '_id name' },
      })
      .populate({
         path: 'trainedUserId',
         select: '_id name workplace',
         populate: { path: 'workplace', select: '_id name' },
      })
      .sort({ trainingDate: 1 });

   let planedTraining = await PlaningTraining.find({ trainedUserId: userid })
      .populate({
         path: 'competenceId',
         select: 'name workplace',
      })
      .populate({
         path: 'createdBy',
         select: '_id name workplace',
         populate: { path: 'workplace', select: '_id name' },
      })
      .populate({
         path: 'trainedUserId',
         select: '_id name workplace',
         populate: { path: 'workplace', select: '_id name' },
      })
      .sort({ trainingDate: 1 });

   const compiled = planedTraining.concat(planedTrainingForUsers);
   const sorted = compiled.sort((a, b) => {
      return new Date(a.trainingDate) - new Date(b.trainingDate);
   });
   res.status(201).json({
      succes: true,
      data: sorted,
   });
});

exports.planTraining = asyncHandler(async (req, res, next) => {
   req.body.createdBy = req.user.id;
   //Validation
   if (req.body.trainedUserId === req.body.createdBy) {
      return next(new ErrorResponse('Cant plan train for yourself', 400));
   }
   const competence = await Competence.findById(req.body.competenceId);
   const user = await User.findById(req.body.trainedUserId);
   if (!user || !competence) {
      return next(new ErrorResponse('Wrong competence or trained user', 400));
   }
   //console.log('user: ' + user);
   //To do add validation cant plan training for past.

   const planedTraining = await PlaningTraining.create(req.body);

   const allUserPlanedTrainging = await PlaningTraining.find({ trainedUserId: req.body.trainedUserId })
      .populate({
         path: 'competenceId',
         select: 'name workplace',
      })
      .sort({ trainingDate: 1 });

   res.status(201).json({
      succes: true,
      data: allUserPlanedTrainging,
   });
});

exports.aproveTraining = asyncHandler(async (req, res, next) => {
   const planedTraining = await PlaningTraining.findById(req.params.planedTrainingId);
   const user = await User.findById(planedTraining.trainedUserId);
   const ratingData = {
      competence_id: planedTraining.competenceId,
      rating: req.body.rating,
      lastmodify: null,
      lastmodify_by: null,
      created_at: Date.now(),
      created_by: req.user.id,
   };
   let pulledDataFromCallBack = '';
   const test = await user.addNewRatingOrUpdateIfExists(
      planedTraining.competenceId,
      ratingData,
      req.user.id,
      function (data) {
         pulledDataFromCallBack = data;
      }
   );
   planedTraining.remove();

   res.status(201).json({
      succes: true,
      data: pulledDataFromCallBack,
   });
});
