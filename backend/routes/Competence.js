const express = require('express');

const { getCompetencesByWorkplace, createCompetence, getCompetence, updateCompetence, deleteCompetence } = require('../controllers/Competence');



const router = express.Router({ mergeParams: true });

const ratingRoutes = require('./Rating');

router.use('/:competenceid/ratings', ratingRoutes)

router
    .route('/')
    .get(getCompetencesByWorkplace)
    .post(createCompetence);

router
    .route('/:id')
    .get(getCompetence)
    .put(updateCompetence)
    .delete(deleteCompetence);

module.exports = router;