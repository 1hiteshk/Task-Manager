'use client'
import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Button } from '@chakra-ui/react';
import api from '@/utils/api';
import { useDispatch } from 'react-redux';
import { deleteTask } from '@/redux/tasks/tasksSlice';
import { useToast } from '@chakra-ui/react';

type Task = {
  taskId: string;
  taskTitle: string;
  taskDescription: string;
  taskStatus: string;
  taskEndDate: string;
  projectId: string;
};

interface TaskCardProps {
  data: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ data }) => {
  const { taskId, taskTitle, taskDescription, taskStatus, taskEndDate } = data;
  const dispatch = useDispatch();
  const toast = useToast();

  const handleDelete = async () => {
    try {
      await api.delete(`/tasks/${taskId}`);
      dispatch(deleteTask(taskId));
      toast({
        title: 'Task deleted.',
        description: "The task has been deleted.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      toast({
        title: 'Error deleting task.',
        description: "There was an error deleting the task.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Card variant={'filled'} border={'2px solid black'}>
      <CardHeader>
        <Heading size='md'>{taskTitle}</Heading>
      </CardHeader>
      <CardBody>
        <Text>Description: {taskDescription}</Text>
        <Text>Status: {taskStatus}</Text>
        <Text>End Date: {taskEndDate}</Text>
      </CardBody>
      <CardFooter display={'flex'} flexDir={'column'}>
        <Button mb={4} onClick={handleDelete}>Delete Task</Button>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
