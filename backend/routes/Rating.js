const express = require('express');

const { addRating } = require('../controllers/Rating');

const router = express.Router({ mergeParams: true });




 router
    .route('/:id')
    .post(addRating);

module.exports = router;