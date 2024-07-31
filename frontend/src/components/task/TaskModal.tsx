import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';
import TaskForm, {TaskFormProps} from './TaskForm';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  _id?: string;
  selectedTask?:any;
  initialData?: TaskFormProps['initialData'];
  onSave: (taskData: { taskTitle: string; taskDescription: string; taskStatus: string; taskEndDate: string }) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, selectedTask,onClose, projectId, _id, initialData, onSave }) => {
  console.log({_id})
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{_id ? 'Edit Task' : 'Add Task'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TaskForm projectId={projectId} onClose={onClose} selectedTask={selectedTask} _id={_id} initialData={initialData} onSave={onSave} />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TaskModal;
