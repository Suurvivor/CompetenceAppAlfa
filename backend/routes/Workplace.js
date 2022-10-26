const express = require('express');

const { getAllWorkplaces, getWorkplacesByDepartment, getWorkplace, updateWorkplace, deleteWorkplace, createWorkplace } = require('../controllers/Workplace');



const competenceRoutes = require('./Competence');

const router = express.Router({ mergeParams: true });

router.use('/:workplaceid/competences', competenceRoutes)

router
    .route('/')
    .get(getWorkplacesByDepartment, getAllWorkplaces)
    .post(createWorkplace);


router
    .route('/:id')
    .get(getWorkplace)
    .put(updateWorkplace)
    .delete(deleteWorkplace);

module.exports = router;