const Task = require('../models/task.model');
const asyncWrapper = require('../middleware/async');
const createCustomError = require('../errors/customApiError');

const createTask = asyncWrapper(async (req, res, next) => {
  const newTask = new Task( req.body );
  try {
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    next(err);
  }
});

const updateTaskById = asyncWrapper(async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskId).exec();
    if (!task) return next(createCustomError('Task not found',400))

    const updatedTask = await Task.findByIdAndUpdate(req.params.taskId,req.body ,{ new: true,
     runValidators : true
    });
    return res.status(200).json(updatedTask);
  } catch (err) {
    return next(err);
  }
});

const getAllTasks = asyncWrapper(async (req, res, next)=> {
  try {
  
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
});

const getTaskById =asyncWrapper(async (req, res, next) => {
  try {
    const tasks = await Task.find({_id:req.params.taskId});
    console.log(tasks)
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
});

const deleteTaskById = asyncWrapper(async (req, res, next) => {
  try {
    await Task.findByIdAndDelete(req.params.taskId);
    res.status(200).json("Deleted Successfully....");
  } catch (err) {
    return next(createCustomError(err,400));
  }
});

module.exports ={createTask, updateTaskById , getAllTasks, getTaskById, deleteTaskById};