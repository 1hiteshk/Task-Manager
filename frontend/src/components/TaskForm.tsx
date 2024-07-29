'use client'
import React, { useState, useEffect } from 'react';
import { Button, FormControl, FormLabel, Input, Textarea, Select } from '@chakra-ui/react';
import api from '../utils/api';

export interface TaskFormProps {
  projectId: string;
  taskId?: string;
  initialData?: {
    taskTitle: string;
    taskDescription: string;
    taskStatus: string;
    taskEndDate: string;
  };
  onSave: (taskData: { taskTitle: string; taskDescription: string; taskStatus: string; taskEndDate: string }) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ projectId, taskId, initialData, onSave }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskEndDate, setTaskEndDate] = useState('');
  const [taskStatus, setTaskStatus] = useState('not completed');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTaskTitle(initialData.taskTitle);
      setTaskDescription(initialData.taskDescription);
      setTaskEndDate(initialData.taskEndDate);
      setTaskStatus(initialData.taskStatus);
    }
  }, [initialData]);

 /*  const handleSaveTask = async (taskData: any) => {
    try {
      if (taskId) {
        await api.put(`/projects/${projectId}/tasks/${taskId}`, taskData);
      } else {
        await api.post(`/projects/${projectId}/tasks`, taskData);
      }
    } catch (error) {
      console.error('Error saving task:', error);
      alert('Failed to save task. Please try again.');
    }
  }; */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   // const taskData = { projectId, taskTitle, taskDescription,taskEndDate, taskStatus };
   
    console.log("handle submit chala task form ka")
    setIsLoading(true);

    onSave({ taskTitle, taskDescription, taskStatus, taskEndDate });

    setIsLoading(false);
  
    console.log("Task saved successfully");
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Task Title</FormLabel>
        <Input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Task Title"
          aria-label="Task Title"
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Task Description</FormLabel>
        <Textarea
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Task Description"
          aria-label="Task Description"
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>End Date</FormLabel>
        <Input
          type="date"
          value={taskEndDate}
          onChange={(e) => setTaskEndDate(e.target.value)}
          placeholder="End Date"
          aria-label="End Date"
          required
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Task Status</FormLabel>
        <Select
          value={taskStatus}
          onChange={(e) => setTaskStatus(e.target.value)}
          aria-label="Task Status"
        >
          <option value="not completed">Not Completed</option>
          <option value="completed">Completed</option>
        </Select>
      </FormControl>
      <Button mt={4} colorScheme="blue" type="submit" isLoading={isLoading}>
        {taskId ? 'Update' : 'Create'} Task
      </Button>
    </form>
  );
};

export default TaskForm;
