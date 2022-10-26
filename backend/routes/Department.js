const express = require('express');

const { getAllDepartments, getDepartment, createDepartment, updateDepartment, deleteDepartment, getDepartments } = require('../controllers/Department');

const { protect } = require('../middleware/auth');

//load re routes
const workplaceRoutes = require('./Workplace');


const router = express.Router();
router.use('/:departmentid/workplaces', workplaceRoutes)

router
    .route('/')
    .get(getAllDepartments)
    .post(protect, createDepartment);


router
    .route('/:id')
    .get(getDepartment)
    .put(updateDepartment)
    .delete(deleteDepartment);

module.exports = router;