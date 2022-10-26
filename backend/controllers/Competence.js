const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Competence = require('../models/Competence');
const Workplace = require('../models/Workplace');

//@desc Get all competences by workplace id
//@route Get /api/v1/workplace/:workplaceid/competences
//@access Private
exports.getCompetencesByWorkplace = asyncHandler(async (req, res, next) => {
   if (!req.params.workplaceid) {
      return next(new ErrorResponse('Send Workplace id', 400));
   }
   const getWorkplace = await Workplace.findById(req.params.workplaceid);
   if (!getWorkplace) {
      return next(
         new ErrorResponse(
            `Could not find workplace of id ${req.params.workplaceid}`,
            400
         )
      );
   }

   const competences = await Competence.find({
      workplace: req.params.workplaceid,
   });
   if (
      competences[0] === null ||
      competences[0] === undefined ||
      competences[0] === ''
   ) {
      return next(
         new ErrorResponse(
            `Could not find any competence in workplace of id ${req.params.workplaceid}`,
            400
         )
      );
   }

   res.status(200).json({
      succes: true,
      data: competences,
   });
});

//@desc Get competence by id
//@route GET /api/v1/competences/:id
//@access Private
exports.getCompetence = asyncHandler(async (req, res, next) => {
   const competence = await Competence.findById(req.params.id);
   if (!competence) {
      return next(
         new ErrorResponse(
            `Could not find any competence in workplace of id ${req.params.workplaceid}`,
            400
         )
      );
   }
   res.status(200).json({
      succes: true,
      data: competence,
   });
});

//@desc Create competence
//@route POST /api/v1/competences
//@access Private
exports.createCompetence = asyncHandler(async (req, res, next) => {
   if (!req.params.workplaceid) {
      return next(new ErrorResponse(`Send id of workplace`, 400));
   }

   const checkWorkplace = await Workplace.findById(req.params.workplaceid);
   if (!checkWorkplace) {
      return next(
         new ErrorResponse(
            `Could not find  workplace of id ${req.params.workplaceid}`,
            400
         )
      );
   }

   req.body.workplace = req.params.workplaceid;
   req.body.createdBy = req.user.id;

   const competence = await Competence.create(req.body);
   res.status(200).json({
      succes: true,
      data: competence,
   });
});

//@desc Update competence by id
//@route PUT /api/v1/competences/:id
//@access Private
exports.updateCompetence = asyncHandler(async (req, res, next) => {
   req.body.lastEditBy = req.user.id;
   req.body.lastEdit = Date.now();

   const competence = await Competence.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
         new: true,
         runValidators: true,
      }
   );
   if (!competence) {
      return next(
         new ErrorResponse(
            `Could not find competence of id ${req.params.id}`,
            400
         )
      );
   }
   res.status(201).json({
      succes: true,
      data: competence,
   });
});

//@desc Delete competence by id
//@route Delete /api/v1/competences/:id
//@access Private
exports.deleteCompetence = asyncHandler(async (req, res, next) => {
   const competence = await Competence.findByIdAndDelete(req.params.id);
   if (!competence) {
      return next(
         new ErrorResponse(
            `Could not find competence of id ${req.params.id}`,
            400
         )
      );
   }
   res.status(200).json({
      succes: true,
      data: [],
   });
});
