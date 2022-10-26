const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Department = require('../models/Department');

//@desc Get all departments
//@route Get /api/v1/departments
//@access Private
exports.getAllDepartments = asyncHandler(async (req, res, next) => {
        const departments = await Department.find();
        if (!departments[0]){
            return next(new ErrorResponse(`Could not find any department`, 400));
        }
        res.status(200).json({
            succes:true,
            data: departments
        });

});

//@desc Get single departments
//@route Get /api/v1/departments/:id
//@access Private
exports.getDepartment = asyncHandler(async (req, res, next) => {
        const department = await Department.findById(req.params.id);
        if (!department){
            return next(new ErrorResponse(`Could not find any department of id ${req.params.id}`, 400));
        }
        res.status(200).json({
            succes:true,
            data: department
        });
    
});

//@desc Create department
//@route POST /api/v1/departments
//@access Private
exports.createDepartment = asyncHandler(async (req, res, next) => {
        req.body.createdBy = req.user.id;
        const department = await Department.create(req.body);
        res.status(201).json({
            succes:true,
            data: department
        });
});

//@desc Update department by id
//@route PUT /api/v1/departments/:id
//@access Private
exports.updateDepartment = asyncHandler(async (req, res, next) => {
    req.body.lastEditBy = req.user.id;
    req.body.lastEdit = Date.now();
    const department = await Department.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!department){
        return next(new ErrorResponse(`Could not find any department of id ${req.params.id}`, 400));
    }

    res.status(200).json({
        succes:true,
        data: department
    });
});

//@desc Delete department by id
//@route DELETE /api/v1/department/:id
//@access Private
exports.deleteDepartment = asyncHandler(async (req, res, next) => {
        const department = await Department.findByIdAndDelete(req.params.id);
        if (!department){
            return next(new ErrorResponse(`Could not find any department of id ${req.params.id}`, 400));
        }
        res.status(200).json({
            succes:true,
            data: []
        });
});

