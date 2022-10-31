const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const GroupCompetence = require('../models/GroupCompetence');
const Competence = require('../models/Competence');
const Workplace = require('../models/Workplace');
const User = require('../models/User');

exports.createGroup = asyncHandler(async (req, res, next) => {
   req.body.createdBy = req.user.id;
   if (!req.body.workplaceId) {
      return next(new ErrorResponse(`send workplaceId in body`, 400));
   }
   const workplace = await Workplace.findById(req.body.workplaceId);

   const competenceGroup = await GroupCompetence.create(req.body);
   res.status(201).json({
      succes: true,
      data: competenceGroup,
   });
});

exports.getAllGroups = asyncHandler(async (req, res, next) => {
   const competenceGroups = await GroupCompetence.find().populate({
      path: 'competenceListId',
      select: '_id name',
   });

   res.status(201).json({
      succes: true,
      data: competenceGroups,
   });
});

exports.updateGroup = asyncHandler(async (req, res, next) => {
   if (req.body.competenceId) {
      next();
      return;
   }
   req.body.lastEditBy = req.user.id;
   req.body.lastEdit = Date.now();

   const competenceGroup = await GroupCompetence.findByIdAndUpdate(req.params.groupid, req.body, {
      new: true,
      runValidators: true,
   });

   res.status(201).json({
      succes: true,
      data: competenceGroup,
   });
});

exports.deleteGroup = asyncHandler(async (req, res, next) => {
   if (req.body.competenceId) {
      return next();
   }
   const competenceGroup = await GroupCompetence.findByIdAndDelete(req.params.groupid);
   res.status(200).json({
      succes: true,
      data: [],
   });
});

exports.addCompetenceToGroup = asyncHandler(async (req, res, next) => {
   const competence = await Competence.findById(req.body.competenceId);
   const competenceGroup = await GroupCompetence.findById(req.params.groupid);
   currentCompetenceList = competenceGroup.competenceListId;
   if (currentCompetenceList.includes(req.body.competenceId)) {
      return next(
         new ErrorResponse(
            `Competence of id: ${req.body.competenceId} is already in group of id: ${req.params.groupid}`,
            400
         )
      );
   }
   currentCompetenceList.push(req.body.competenceId);
   await competenceGroup.updateOne({ competenceListId: currentCompetenceList });

   res.status(201).json({
      succes: true,
      data: currentCompetenceList,
   });
});

exports.deleteCompetenceFromGroup = asyncHandler(async (req, res, next) => {
   const competenceGroup = await GroupCompetence.findById(req.params.groupid);
   if (!competenceGroup) {
      return next(new ErrorResponse(`Group dont exists of id: ${req.params.groupid}`, 400));
   }
   currentCompetenceList = competenceGroup.competenceListId;
   if (!currentCompetenceList.includes(req.body.competenceId)) {
      return next(
         new ErrorResponse(
            `Competence of id: ${req.body.competenceId} dont exists in group of id: ${req.params.groupid}`,
            400
         )
      );
   }
   const index = currentCompetenceList.findIndex((competence) => competence._id == req.body.competenceId);
   currentCompetenceList.splice(index, 1);

   await competenceGroup.updateOne({ competenceListId: currentCompetenceList });

   res.status(201).json({
      succes: true,
      data: currentCompetenceList,
   });
});

exports.getGroupedCompetencesByWorkplaceId = asyncHandler(async (req, res, next) => {
   if (!req.params.workplaceid) return next(new ErrorResponse(`provide workplaceId in params of`, 500));

   const competenceGroups = await GroupCompetence.find({
      workplaceId: req.params.workplaceid,
   }).populate({
      path: 'competenceListId',
      select: '_id name ratingSetting',
   });
   if (competenceGroups.length === 0) {
      return next(
         new ErrorResponse(`Could not find any grouped competences with workplace ID ${req.params.workplaceid}`)
      );
   }

   res.status(201).json({
      succes: true,
      data: competenceGroups,
   });
});

exports.getGroupedCompetencesCompareWithUserRating = asyncHandler(async (req, res, next) => {
   const competenceGroups = await GroupCompetence.find({
      workplaceId: req.user.workplace,
   }).populate('competenceListId');
   if (competenceGroups.length <= 0) {
      return next(new ErrorResponse(`Could not find workplaceid of ${req.user.workplace}`, 400));
   }
   const user = await User.findById(req.params.userid);
   const newCompetenceList = [];
   const backup = competenceGroups;
   console.log(backup.competenceListId);
   //for each rating
   for (let x = 0; x < user.rating.length; x++) {
      //for each group
      for (let i = 0; i < backup.length; i++) {
         //for each competencelist
         for (let y = 0; y < backup[i].competenceListId.length; y++) {
            if (backup[i].competenceListId[y]._id == user.rating[x].competence_id) {
               if (!user.rating[x].lastmodify_by) {
                  let obj = {
                     competenceId: backup[i].competenceListId[y]._id,
                     competenceName: backup[i].competenceListId[y].name,
                     rating: user.rating[x].rating,
                     trainer: user.rating[x].created_by,
                     trainDate: user.rating[x].created_at,
                  };
               }
               let obj = {
                  competenceId: backup[i].competenceListId[y]._id,
                  competenceName: backup[i].competenceListId[y].name,
                  rating: user.rating[x].rating,
                  trainer: user.rating[x].lastmodify_by,
                  trainDate: user.rating[x].lastmodify,
               };

               backup[i].competenceListIdWithRating.push(obj);
            } else {
               let obj2 = {
                  competenceId: backup[i].competenceListId[y]._id,
                  competenceName: backup[i].competenceListId[y].name,
                  rating: null,
                  trainer: null,
                  trainDate: null,
               };
               backup[i].competenceListIdWithRating.push(obj2);
            }
         }
      }
   }
   backup.forEach((list) => {
      newCompetenceList.push({
         groupName: list.name,
         competenceList: list.competenceListIdWithRating,
      });
   });

   res.status(201).json({
      succes: true,
      data: newCompetenceList,
   });
});
