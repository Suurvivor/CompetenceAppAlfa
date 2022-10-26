const express = require('express');

const { addUser, getUsers, getUser, updateUser, deleteUser } = require('../controllers/User');

const router = express.Router();

router
    .route('/')
    .get(getUsers)
    .post(addUser);


 router
    .route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;