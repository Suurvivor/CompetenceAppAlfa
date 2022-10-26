const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Workplace = require('../models/Workplace');
const Department = require('../models/Department');

//@desc Get all workplaces
//@route Get /api/v1/workplaces
//@access Private
exports.getAllWorkplaces = asyncHandler(async (req, res, next) => {
    const workplaces = await Workplace.find();
    if (!workplaces){
        return next(new ErrorResponse(`Could not find workplace of id ${req.params.id}`, 400));
    }
    res.status(200).json({
        succes: true,
        data: workplaces
    });
});

//@desc Get all workplaces of Department by its id
//@route Get /api/v1/departments/:departmentid/workplace
//@access Private
exports.getWorkplacesByDepartment = asyncHandler(async (req, res, next) => {
    if (!req.params.departmentid){
        return next();
    }

    const getDepartment = await Department.findById(req.params.departmentid);
    if (!getDepartment){
        return next(new ErrorResponse(`Could not find department of id ${req.params.departmentid}`, 400));
    }

    const workplace = await Workplace.find({ department: req.params.departmentid });
    if (!workplace[0]){
        return next(new ErrorResponse(`Could not find any workplace in Department of id ${req.params.departmentid}`, 400));
    }

    res.status(200).json({
        succes: true,
        data: workplace
    });
});

//@desc Get workplace by id
//@route GET /api/v1/workplaces/:id
//@access Private
exports.getWorkplace = asyncHandler(async (req, res, next) => {
    const workplace = await Workplace.findById(req.params.id);
    if (!workplace){
        return next(new ErrorResponse(`Could not find workplace of id ${req.params.id}`, 400));
    }
    res.status(200).json({
        succes: true,
        data: workplace,
    });
});

//@desc Create workplace
//@route POST /api/v1/departments/:departmentid/workplaces
//@access Private
exports.createWorkplace = asyncHandler(async (req, res, next) => {
    if (!req.params.departmentid){
        return next(new ErrorResponse('Send department id', 400));
    }

    const getDepartment = await Department.findById(req.params.departmentid);
    if (!getDepartment){
        return next(new ErrorResponse(`Could not find department of id ${req.params.departmentid}`, 400));
    }

    req.body.department = req.params.departmentid;
    req.body.createdBy = req.user.id;
    const workplace = await Workplace.create(req.body);
    res.status(200).json({
        succes: true,
        data: workplace
    });

});

//@desc Update workplace by id
//@route PUT /api/v1/workplaces/:id
//@access Private
exports.updateWorkplace = asyncHandler(async (req, res, next) => {
    req.body.lastEditBy = req.user.id;
    req.body.lastEdit = Date.now();
    const workplace = await Workplace.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!workplace){
        return next(new ErrorResponse(`Could not find workplace of id ${req.params.id}`, 400));
    }
    res.status(201).json({
        succes: true,
        data: workplace
    });
});

//@desc Delete workplace by id
//@route Delete /api/v1/workplaces/:id
//@access Private
exports.deleteWorkplace = asyncHandler(async (req, res, next) => {
    const workplace = await Workplace.findByIdAndDelete(req.params.id);
    if (!workplace){
        return next(new ErrorResponse(`Could not find workplace of id ${req.params.id}`, 400));
    }
    res.status(200).json({
        succes: true,
        data: []
    });
});