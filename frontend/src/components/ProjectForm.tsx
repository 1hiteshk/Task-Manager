'use client';

import React, { useState, useEffect } from 'react';
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import api from '@/utils/api';
import { useDispatch } from 'react-redux';
import { addUserProject, updateUserProject } from '@/redux/projects/projectsSlice';
import userProfile from '@/hooks/userProfile';

export interface ProjectFormProps {
  projectId?: string;
  initialData?: {
    projectTitle: string;
    projectNumber: string;
  };
  onSave: () => void;
  onClose: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ projectId, initialData, onSave, onClose }) => {
    const [projectTitle, setProjectTitle] = useState(initialData?.projectTitle || '');
    const [projectNumber, setProjectNumber] = useState(initialData?.projectNumber || '');
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState<any>();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = await userProfile();
      setUserDetails(user);
    };
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (initialData) {
      setProjectTitle(initialData.projectTitle);
      setProjectNumber(initialData.projectNumber);
    }
  }, [initialData]);

  const handleSaveProject = async () => {
    const projectData = { userId: String(userDetails?.id), projectTitle, projectNumber };
    const projectDataToUpdate = { _id: projectId, ...projectData };

    setIsLoading(true);

    try {
      if (projectId) {
        await api.put(`/projects/${projectId}`, projectData);
        dispatch(updateUserProject(projectDataToUpdate));
      } else {
        await api.post('/projects', projectData);
        dispatch(addUserProject(projectDataToUpdate));
      }
      onSave();
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Failed to save project. Please try again.');
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSaveProject(); }}>
      <FormControl>
        <FormLabel>Project Title</FormLabel>
        <Input
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
          placeholder="Project Title"
          aria-label="Project Title"
          required
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Project Number</FormLabel>
        <Input
          value={projectNumber}
          onChange={(e) => setProjectNumber(e.target.value)}
          placeholder="Project Number"
          aria-label="Project Number"
          required
        />
      </FormControl>
      <Button mt={4} colorScheme="blue" type="submit" isLoading={isLoading}>
        {projectId ? 'Update' : 'Create'} Project
      </Button>
    </form>
  );
};

export default ProjectForm;
