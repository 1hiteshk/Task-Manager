'use client';
import React, { useState, useEffect } from 'react';
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { addProject, addUserProject, fetchProjects, updateProject, updateUserProject } from '@/redux/projects/projectsSlice';
import { fetchUserInfo } from '@/redux/user/userInfoSlice';
import { AppDispatch, RootState } from '@/redux/store'
import { fetchProjectDetails } from '@/redux/projects/projectDetailsSlice';

export interface ProjectFormProps {
  projectId?: string | any;
  initialData?: {
    projectTitle: string;
    projectNumber: number;
  };
  onSave: () => void;
  onClose: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ projectId, initialData, onSave, onClose }) => {
    const [projectTitle, setProjectTitle] = useState(initialData?.projectTitle || '');
    const [projectNumber, setProjectNumber] = useState<number>(initialData?.projectNumber ?? 0);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  // Access user details from Redux store
  const userDetails = useSelector((state: RootState) => state.userDetails);

 // Fetch user details if not already in the store
 useEffect(() => {
  if (!userDetails.id) {
    dispatch(fetchUserInfo());
  }
}, [dispatch, userDetails]);

 

  const handleSaveProject = async () => {
     if (!userDetails.id) {
      alert('User details are not available');
      return;
    }
    const projectData = { userId: String(userDetails?.id), projectTitle, projectNumber }; 
   // const projectDataToUpdate = { _id: projectId, ...projectData }; 

    setIsLoading(true);

    try {
      if (projectId) {
        await dispatch(updateProject({ ...projectData, _id: projectId }));
      } else {
        await dispatch(addProject(projectData));
      }
      dispatch(fetchProjects());
      dispatch(fetchProjectDetails(projectId));
      //Dispatched fetchProjects to refresh the projects list after adding or updating a project.
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
          type="number"
          min={1}
          value={projectNumber}
          onChange={(e) => setProjectNumber(Number(e.target.value))}
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
