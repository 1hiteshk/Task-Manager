import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  taskId: string;
  taskTitle: string;
  taskDescription: string;
  taskStatus: string;
  taskEndDate: string;
  projectId: string;
}

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(task => task.taskId === action.payload.taskId);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.taskId !== action.payload);
    },
    deleteTasksByProjectId: (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter(task => task.projectId !== action.payload);
      },
  },
});

export const { setTasks, addTask, updateTask, deleteTask ,deleteTasksByProjectId} = tasksSlice.actions;

export default tasksSlice.reducer;
