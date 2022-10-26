const express = require('express');

//load controlers
const { createGroup, getAllGroups, addCompetenceToGroup, deleteCompetenceFromGroup, updateGroup, deleteGroup, getGroupedCompetencesCompareWithUserRating } = require('../controllers/GroupCompetence');

const router = express.Router();

router.get('/', getAllGroups);
router.get('/:userid', getGroupedCompetencesCompareWithUserRating);
router.post('/', createGroup);
router.post('/:groupid', updateGroup, addCompetenceToGroup);
router.delete('/:groupid', deleteGroup, deleteCompetenceFromGroup);

module.exports = router;