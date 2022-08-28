const Task = require('../models/Task');
const  { createCustomError } = require('../errors/custom-error')

const getAllTasks = async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({ tasks })
}


const createTask = async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })

}


const getTask = async (req, res) => {
    const { id: taskId } = req.params;
    const task = await Task.findOne({ _id: taskId});
    if (!task){
        return next(createCustomError(`No task with id : ${taskId}`, 404))
    }
    res.status(200).json({ task })


}


const updateTask = async (req, res, next) => {
    const { id: taskId } = req.params;
    const task = await Task.findByIdAndUpdate({ _id: taskId}, req.body,{
        new: true,
        runValidators: true
    })
    if (!task){
        return next(createCustomError(`No task with id : ${taskId}`, 404))
    }
    res.status(200).json({ task })
    
}



const deleteTask = async (req, res, next) => {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskId})
    if (!task){
        return next(createCustomError(`No task with id : ${taskId}`, 404))

    }
    res.status(200).json({ task })
}





module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}