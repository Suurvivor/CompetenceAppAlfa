const express = require('express');
const advancedResults = require('../middleware/advancedResults');
const User = require('../models/User');

const { addUser, getUsers, getUser, updateUser, deleteUser } = require('../controllers/User');

const router = express.Router();

router
   .route('/')
   .get(
      advancedResults(User, {
         path: 'workplace',
         populate: {
            path: 'department',
         },
      }),
      getUsers
   )
   .post(addUser);

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
