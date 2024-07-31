'use client'
import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Button } from '@chakra-ui/react';
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
    <Card variant={'filled'} border={'1px solid #1b1f2326'}>
      <CardHeader>
        <Heading size='md'>{taskTitle}</Heading>
      </CardHeader>
      <CardBody>
        <Text>Description: {taskDescription}</Text>
        <Text>Status: {taskStatus}</Text>
        <Text fontSize={{base:'18px',sm:'24px'}} fontWeight={700}>{formatDaysLeft(String(taskEndDate))}</Text>
      </CardBody>
      <CardFooter display={'flex'} flexDir={'column'}>
      <Button onClick={onEdit} mt={2} colorScheme="blue">Edit Task</Button>
      <Button onClick={onDelete} mt={2} colorScheme="red">Delete Task</Button>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;