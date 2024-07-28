// components/ProjectModal.tsx

import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import api from '@/utils/api';
import userProfile from '@/hooks/userProfile';
import { useDispatch } from 'react-redux';
import { addUserProject, updateUserProject } from '@/redux/projects/projectsSlice';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId?: string;
  initialData?: {
    projectTitle: string;
    projectNumber: string;
  };
  onSave: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, projectId, initialData, onSave }) => {
  const [projectTitle, setProjectTitle] = useState('');
  const [projectNumber, setProjectNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const userDetails = userProfile(); // Get the user profile using the custom hook
  console.log(userDetails)
  const userId = String(userDetails?.id);
  const dispatch =useDispatch()

  useEffect(() => {
    if (initialData) {
      setProjectTitle(initialData.projectTitle);
      setProjectNumber(initialData.projectNumber);
    }
  }, [initialData]);

  const handleSaveProject = async () => {

    const projectData = {  userId,projectTitle, projectNumber };
    let _id = projectId
    const projectData2 = {  _id,userId,projectTitle, projectNumber };

    setIsLoading(true);

    try {
      if (projectId) {
        await api.put(`/projects/${projectId}`, projectData);
        dispatch(updateUserProject(projectData2));
      } else {
        await api.post('/projects', projectData);
        dispatch(addUserProject(projectData2));
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{projectId ? 'Edit Project' : 'Add Project'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSaveProject} isLoading={isLoading}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProjectModal;
