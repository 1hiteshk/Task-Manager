const express = require('express');
const validateToken = require('../middlewares/validateTokenHandler');
const {createTask,getTasks,getTask,updateTask,deleteTask} = require('../controllers/taskController');

const router = express.Router();

router.post('/:projectId/tasks', validateToken, createTask);

router.get('/:projectId/tasks', validateToken, getTasks);

router.get('/:projectId/tasks/:taskId', validateToken, getTask);

router.put('/:projectId/tasks/:taskId', validateToken, updateTask);

router.delete('/:projectId/tasks/:taskId', validateToken, deleteTask);

module.exports = router;

