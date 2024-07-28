// components/TaskModal.tsx

import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';
import TaskForm, {TaskFormProps} from './TaskForm';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  taskId?: string;
  initialData?: TaskFormProps['initialData'];
  onSave: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, projectId, taskId, initialData, onSave }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{taskId ? 'Edit Task' : 'Add Task'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TaskForm projectId={projectId} taskId={taskId} initialData={initialData} onSave={onSave} />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TaskModal;
