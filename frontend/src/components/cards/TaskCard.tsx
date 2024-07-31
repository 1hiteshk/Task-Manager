'use client'
import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Button } from '@chakra-ui/react';
import api from '@/utils/api';
import { useDispatch } from 'react-redux';
import { deleteTask } from '@/redux/tasks/tasksSlice';
import { useToast } from '@chakra-ui/react';
import { formatDaysLeft } from '@/utils/formatDate';

type Task = {
  _id?: string;
  taskTitle: string;
  taskDescription: string;
  taskStatus: string;
  taskEndDate?: string;
  createdAt?: string | any;
 
};

interface TaskCardProps {
  task: Task;
  projectId?: string;
  onEdit: () => void;
  onDelete: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task,projectId,onDelete,onEdit }) => {
  const { _id, taskTitle, taskDescription, taskStatus, taskEndDate } = task;

  return (
    <Card variant={'filled'} border={'2px solid black'}>
      <CardHeader>
        <Heading size='md'>{taskTitle}</Heading>
      </CardHeader>
      <CardBody>
        <Text>Description: {taskDescription}</Text>
        <Text>Status: {taskStatus}</Text>
        <Text>{formatDaysLeft(String(taskEndDate))}</Text>
      </CardBody>
      <CardFooter display={'flex'} flexDir={'column'}>
      <Button onClick={onEdit} mt={2} colorScheme="blue">Edit Task</Button>
      <Button onClick={onDelete} mt={2} colorScheme="red">Delete Task</Button>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
