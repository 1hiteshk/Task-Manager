const express = require('express');
const {createProject,deleteProject,updateProject,getProject,getProjects} = require('../controllers/projectController');
const validateToken = require('../middlewares/validateTokenHandler');

const router = express.Router();

router.post('/',validateToken, createProject);

router.get('/',validateToken, getProjects);

router.get('/:id',validateToken, getProject);

router.put('/:id', validateToken,updateProject);

router.delete('/:id',validateToken, deleteProject);

module.exports = router;