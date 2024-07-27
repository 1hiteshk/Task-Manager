const Project = require('../models/projectModels');
require('dotenv').config();
const validateToken = require('../middlewares/validateTokenHandler');

// create a new project
const createProject = async (req,res) =>{
    const {projectNumber,projectTitle} = req.body;
    const userId = req.user.id; // Extract the user ID from the JWT payload

    if(!projectNumber ||!projectTitle){
        return res.status(400).json({message: 'All fields are required'});
    }
    const project = new Project({projectNumber, projectTitle, userId});
    await project.save();
    res.status(201).json(project);
}

// get all projects of a user
const getProjects = async (req, res) => {
  try {
    const userId = req.user.id; // Extract the user ID from the request
    const projects = await Project.find({ userId });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// get a single project by id
const getProject = async (req,res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
          return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
      } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
      }
}

// update a project by id
const updateProject = async (req,res) => {
  const { projectNumber, projectTitle } = req.body;
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { projectNumber, projectTitle, userId: req.user._id },
      { new: true, runValidators: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// delete a project ans it's tasks

const deleteProject = async (req,res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
 //   await Task?.deleteMany({ projectId: req.params.id });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ project: project, message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { createProject, getProjects, getProject, updateProject, deleteProject };