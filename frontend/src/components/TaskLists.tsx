import { useEffect, useState } from 'react';
import api from '../utils/api';
import { Box, Button, Heading, Select, useDisclosure } from '@chakra-ui/react';
import TaskModal from '@/components/TaskModal';
import { formatDaysLeft } from '@/utils/formatDate';
import { isSameDay } from 'date-fns';

// Define the props interface
interface TaskListProps {
  projectId: string;
  refreshTasks?: boolean;
  selectedDate?: Date;
}

// Define the task interface
interface Task {
  _id: string;
  taskTitle: string;
  taskDescription: string;
  taskStatus: string;
  taskEndDate?: string;
  createdAt?: string;
  // Add any other fields you may have in your task data
}

const TaskList = ({ projectId, refreshTasks,selectedDate }: TaskListProps) => {
    console.log(selectedDate)
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const { isOpen, onOpen, onClose } = useDisclosure();

 

  const fetchTasks = async () => {
    
  try {
    const res = await api.get(`/projects/${projectId}/tasks`);
    console.log(res.data,"task lists data")
    setTasks(res.data);
    setFilteredTasks(res.data);
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};


  useEffect(() => {
    fetchTasks();
  }, [projectId, refreshTasks]);

  useEffect(() => {
    filterTasks();
  }, [selectedDate,filter, tasks]);

  const filterTasks = () => {
    let filtered = tasks.filter(task => {
      const taskStartDate = new Date(task?.createdAt || '');
      const taskEndDate = new Date(task?.taskEndDate || '');
      console.log(taskStartDate,selectedDate,taskEndDate)
      return selectedDate && ((selectedDate >= taskStartDate && selectedDate <= taskEndDate) || selectedDate <= taskEndDate);
    });
    if (filter !== 'all') {
      filtered = filtered.filter(task => task.taskStatus === filter);
    }
    setFilteredTasks(filtered);
  };

 

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    onOpen();
  };

  const handleSave = () => {
    fetchTasks(); // Refetch tasks after saving
    onClose();
  };

  const handleDelete = async (taskId: string) => {
    
    try {
      await api.delete(`/projects/${projectId}/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId)); // Update the task list
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  console.log(tasks,"tasks")
  if(tasks.length==0) return(
    <Heading display={'flex'} justifyContent={'center'} alignItems={'center'} as={'h3'} >No tasks for this project</Heading>
  )

  return (
    <div >
         <Box mb={4}>
        <Select onChange={handleFilterChange} value={filter}>
          <option value="all">All Tasks</option>
          <option value="completed">Completed</option>
          <option value="not completed">Not Completed</option>
        </Select>
      </Box>
      {filteredTasks.map((task) => (
        <div style={{border:"2px solid black",padding:"6px", gap:"2px"}} key={task?._id}>
          <h1>{task?.taskTitle}</h1>
          <h2>{task?.taskStatus}</h2>
          <p>{task?.taskDescription}</p>
          <p>End Date: {new Date(String(task?.taskEndDate)).toLocaleDateString()}</p>
          <p>{formatDaysLeft(String(task?.taskEndDate))}</p>
          <Button onClick={() => handleEdit(task)}>Edit task</Button>
          <Button onClick={() => handleDelete(task._id)}>Delete task</Button>
        </div>
      ))}

      {selectedTask && (
        <TaskModal
          isOpen={isOpen}
          onClose={onClose}
          projectId={projectId}
          taskId={selectedTask._id}
          initialData={{
            taskTitle: selectedTask.taskTitle,
            taskDescription: selectedTask.taskDescription,
            taskEndDate: String(selectedTask.taskEndDate),
            taskStatus: selectedTask.taskStatus
            
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default TaskList;
