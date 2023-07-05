const express = require('express');

const {
   getAllDepartments,
   getDepartment,
   getDepartmentByName,
   createDepartment,
   updateDepartment,
   deleteDepartment,
} = require('../controllers/Department');

const { protect } = require('../middleware/auth');

//load re routes
const workplaceRoutes = require('./Workplace');

const router = express.Router();
router.use('/:departmentid/workplaces', workplaceRoutes);

router.use('/byname/:name', getDepartmentByName);

router.route('/').get(getAllDepartments).post(protect, createDepartment);

router.route('/:id').get(getDepartment).put(updateDepartment).delete(deleteDepartment);

module.exports = router;
