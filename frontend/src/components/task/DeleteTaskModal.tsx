import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Text, useToast } from '@chakra-ui/react';
import api from '@/utils/api';
import { useDispatch } from 'react-redux';
import { deleteTask } from '@/redux/tasks/tasksSlice';
import { AppDispatch } from '@/redux/store';

interface Task {
  _id?: string;
  taskTitle: string;
  taskDescription: string;
  taskStatus: string;
  taskEndDate?: string;
  createdAt?: string;
}

interface DeleteTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  onConfirm: () => void;
  projectId: string;
}

const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({ isOpen,projectId, onClose, task, onConfirm }) => {
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();

  const handleDelete = async () => {
    try {
      await api.delete(`/projects/${projectId}/tasks/${task._id}`);
      dispatch(deleteTask(String(task._id)));
      onConfirm();
      toast({
        title: `Task ${task.taskTitle} deleted.`,
        description: "The task has been deleted.",
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    } catch (error) {
      console.error('Error deleting task:', error);
      toast({
        title: `Error deleting task.`,
        description: "There was an error deleting the task.",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure you want to delete the task "{task.taskTitle}"?</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={handleDelete}>
            Yes
          </Button>
          <Button variant="ghost" onClick={onClose}>
            No
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteTaskModal;
