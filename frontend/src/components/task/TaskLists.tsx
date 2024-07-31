"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Select,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import TaskModal from "@/components/task/TaskModal";
import { formatDaysLeft } from "@/utils/formatDate";
import {
  fetchTasks,
  addTask,
  updateTask,
  deleteTask,
} from "@/redux/tasks/tasksSlice";
import { RootState, AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import TaskFilterButtons from "./TaskFilterButtons";
import DeleteTaskModal from "./DeleteTaskModal";
import TaskCard from "../cards/TaskCard";

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

const TaskList = ({ projectId, refreshTasks, selectedDate }: TaskListProps) => {
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [filter, setFilter] = useState<"all" | "not completed" | "completed">(
    "all"
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const taskStatus = useSelector((state: RootState) => state.tasks.status);

  useEffect(() => {
    // Check if tasks are present for the given projectId
    const projectTasks = tasks.filter((task) => task.projectId === projectId);

    if (projectTasks.length > 0) {
      // If tasks are present, filter them
      setFilteredTasks(projectTasks);
    } else {
      // If no tasks are present, make an API call
      dispatch(fetchTasks(projectId));
    }
  }, [projectId, tasks]);

  useEffect(() => {
    filterTasks();
  }, [selectedDate, filter, tasks]);

  const filterTasks = () => {
    let filtered = tasks.filter((task) => {
      if (task.projectId !== projectId) return false;

      const taskStartDate = new Date(task?.createdAt || "");
      const taskEndDate = new Date(task?.taskEndDate || "");
      return (
        selectedDate &&
        ((selectedDate >= taskStartDate && selectedDate <= taskEndDate) ||
          selectedDate <= taskEndDate)
      );
    });

    if (filter !== "all") {
      filtered = filtered.filter((task) => task.taskStatus === filter);
    }

    setFilteredTasks(filtered);
  };

  const handleFilterChange = (
    filter: "all" | "not completed" | "completed"
  ) => {
    setFilter(filter);
  };

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    onOpen();
  };

  const handleSave = async (taskData: {
    taskTitle: string;
    taskDescription: string;
    taskStatus: string;
    taskEndDate: string;
  }) => {
    try {
      if (selectedTask) {
        await dispatch(
          updateTask({ projectId, _id: selectedTask._id, taskData })
        );
      } else {
        await dispatch(addTask({ projectId, taskData }));
      }
      dispatch(fetchTasks(projectId));
    } catch (error) {
      console.error("Error saving task:", error);
      alert("Failed to save task. Please try again.");
    }
    onClose();
  };

  if (tasks.filter((task) => task.projectId === projectId).length === 0) {
    return (
      <Heading
        display={"flex"}
        p={4}
        justifyContent={"center"}
        alignItems={"center"}
        as={"h3"}
      >
        No tasks for this project
      </Heading>
    );
  }

  return (
    <Box>
      <Stack gap={4} justifyContent={"center"}>
        <TaskFilterButtons
          selectedFilter={filter}
          onFilterChange={handleFilterChange}
        />
        <Box mb={4}>
          <Select
            onChange={(e) =>
              handleFilterChange(
                e.target.value as "all" | "not completed" | "completed"
              )
            }
            value={filter}
          >
            <option value="all">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="not completed">Not Completed</option>
          </Select>
        </Box>
      </Stack>
      <Box  display={'flex'} flexDirection={'column'} gap={2} >
      {filteredTasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={() => handleEdit(task)}
          onDelete={() => setTaskToDelete(task)}
        />
      ))}
      </Box>

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
            taskStatus: selectedTask.taskStatus,
          }}
          selectedTask={selectedTask}
          onSave={handleSave}
        />
      )}
      {taskToDelete && (
        <DeleteTaskModal
          isOpen={!!taskToDelete}
          task={taskToDelete}
          projectId={projectId}
          onClose={() => setTaskToDelete(null)}
          onConfirm={() => {
            setTaskToDelete(null);
            dispatch(fetchTasks(projectId));
          }}
        />
      )}
    </Box>
  );
};

export default TaskList;
