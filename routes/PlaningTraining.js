const express = require('express');

//load controlers
const { getPlanedTraining, planTraining, aproveTraining } = require('../controllers/PlaningTraining');

const router = express.Router();

router.get('/', getPlanedTraining);
router.get('/:userid', getPlanedTraining);
router.post('/', planTraining);
router.post('/:planedTrainingId', aproveTraining);

module.exports = router;
