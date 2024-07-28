const Task = require('../models/taskModels');
const Project = require('../models/projectModels');
require('dotenv').config();

// create a new task for a project 
const createTask = async(req,res) => {
    const {taskTitle, taskDescription,taskEndDate, taskStatus} = req.body;
    const userId = req.user.id; // Extract the user ID from the JWT payload
    const projectId = req.params.projectId; // Extract the project ID from the request parameters
    console.log(req.params,"req.params")
    if(!taskTitle ||!taskDescription || !taskEndDate || !taskStatus){
        return res.status(400).json({message: 'All fields are required'});
    }
    const task = await Task.create({projectId,taskTitle,taskDescription,taskEndDate,taskStatus});
    res.status(201).json(task);
}

// get all tasks of a project by projectId
const getTasks = async(req,res) => {
    // Check if the project exists
  const project = await Project.findById(req.params.projectId);
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

    const tasks = await Task.find({projectId: req.params.projectId});
    res.status(200).json(tasks);
}

// get a single task by taskId
const getTask = async(req,res) => {
    try {
        const task = await Task.findById(req.params.taskId);
        if (!task) {
          return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// update a task by taskId
const updateTask = async(req,res) => {
    const {taskTitle, taskDescription,taskEndDate, taskStatus} = req.body;

    if(!taskTitle && !taskDescription && !taskEndDate && !taskStatus){
        return res.status(400).json({message: 'At least one field needs to be updated'});
    }
    const updatedTask = await Task.findByIdAndUpdate(req.params.taskId, req.body, {new: true});

    if(!updatedTask){
        return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(updatedTask);
}

// delete a task by taskId
const deleteTask = async(req,res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.taskId);
        if(!task){
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ task ,message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = { createTask, getTasks, getTask, updateTask, deleteTask };