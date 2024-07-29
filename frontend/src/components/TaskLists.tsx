'use client'
import { useEffect, useState } from 'react';
import api from '../utils/api';
import { Box, Button, Heading, Select, useDisclosure } from '@chakra-ui/react';
import TaskModal from '@/components/TaskModal';
import { formatDaysLeft } from '@/utils/formatDate';
import { fetchTasks, addTask, updateTask, deleteTask } from '@/redux/tasks/tasksSlice';
import { RootState, AppDispatch } from '@/app/store';
import { useDispatch, useSelector } from 'react-redux';

// Define the props interface
interface TaskListProps {
  projectId: string;
  refreshTasks?: boolean;
  selectedDate?: Date;
}

// Define the task interface
interface Task {
  _id?: string | any;
  taskTitle: string;
  taskDescription: string;
  taskStatus: string;
  taskEndDate?: string | any;
  createdAt?: string;
  // Add any other fields you may have in your task data
}

const TaskList = ({ projectId, refreshTasks,selectedDate }: TaskListProps) => {
   // console.log(selectedDate)
   const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
   const [selectedTask, setSelectedTask] = useState<Task | null>(null);
   const [filter, setFilter] = useState<string>('all');
   const { isOpen, onOpen, onClose } = useDisclosure();

   const dispatch = useDispatch<AppDispatch>();
   const tasks = useSelector((state: RootState) => state.tasks.tasks);
   const taskStatus = useSelector((state: RootState) => state.tasks.status);

   useEffect(() => {
    if (taskStatus === 'idle') {
      dispatch(fetchTasks(projectId));
    }
  }, [dispatch, projectId, taskStatus]);

  useEffect(() => {
    filterTasks();
  }, [selectedDate, filter, tasks]);



  const filterTasks = () => {
    let filtered = tasks.filter(task => {
      const taskStartDate = new Date(task?.createdAt || '');
      const taskEndDate = new Date(task?.taskEndDate || '');
      console.log({taskStartDate,selectedDate,taskEndDate})
      return selectedDate && ((selectedDate >= taskStartDate && selectedDate <= taskEndDate) || selectedDate <= taskEndDate);
    });
    if (filter !== 'all') {
      filtered = filtered.filter(task => task.taskStatus === filter);
    }
    console.log({filtered})
    setFilteredTasks(filtered);
  };

 

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const handleEdit = (task: Task) => {
   // setSelectedTask(task);
    console.log(selectedTask)
    console.log(task)
    onOpen();
  };

  const handleSave = async (taskData: { taskTitle: string; taskDescription: string; taskStatus: string; taskEndDate: string }) => {
    console.log("handle save chala Taskslists ka")
    try {
      if (selectedTask) {
        await dispatch(updateTask({  projectId, _id: selectedTask._id , taskData }));
        console.log("handle save chala Taskslists ka")
      } else {
        await dispatch(addTask({ projectId, taskData }));
        console.log("handle save chala Taskslists ka")
      }
      dispatch(fetchTasks(projectId));
    } catch (error) {
      console.error('Error saving task:', error);
      alert('Failed to save task. Please try again.');
    }
    onClose();
  };

  const handleDelete = async (taskId: string) => {
    
    try {
      await api.delete(`/projects/${projectId}/tasks/${taskId}`);
      dispatch(deleteTask(taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  console.log({filteredTasks})
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
        <div style={{border:"2px solid black",padding:"12px", gap:"2px"}} key={task?._id}>
          <h1>{task?.taskTitle}</h1>
         {/*  <h1>{task?.taskId}</h1> */}
          <h1>{task?._id}</h1>
          hiiii
          <h2>{task?.taskStatus}</h2>
          <p>{task?.taskDescription}</p>
          <p>End Date: {new Date(String(task?.taskEndDate)).toLocaleDateString()}</p>
          <p>{formatDaysLeft(String(task?.taskEndDate))}</p>
          <Button onClick={() => {setSelectedTask(task); handleEdit(task);}}>Edit task</Button>
          <Button onClick={() => handleDelete(task?._id)}>Delete task</Button>
        </div>
      ))}

      {selectedTask && (
        <TaskModal
          isOpen={isOpen}
          onClose={onClose}
          projectId={projectId}
          _id={selectedTask._id}
          initialData={{
            taskTitle: selectedTask.taskTitle,
            taskDescription: selectedTask.taskDescription,
            taskEndDate: String(selectedTask.taskEndDate),
            taskStatus: selectedTask.taskStatus
            
          }}
          selectedTask={selectedTask}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default TaskList;
