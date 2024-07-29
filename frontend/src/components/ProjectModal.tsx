'use client';

import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';
import ProjectForm, { ProjectFormProps } from './ProjectForm';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId?: string;
  initialData?: ProjectFormProps['initialData'];
  onSave: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, projectId, initialData, onSave }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{projectId ? 'Edit Project' : 'Add Project'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ProjectForm projectId={projectId} initialData={initialData} onSave={onSave} onClose={onClose} />
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProjectModal;
