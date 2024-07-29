import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/utils/api';

interface Task {
  _id?: string | any;
  taskTitle: string;
  taskDescription: string;
  taskStatus: string;
  taskEndDate?: string | any;
  projectId?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface TasksState {
  tasks: Task[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  status: 'idle',
  error: null,
};


// Async thunk to fetch tasks
export const fetchTasks = createAsyncThunk<Task[], string>('tasks/fetchTasks', async (projectId) => {
  const response = await api.get(`/projects/${projectId}/tasks`);
  console.log({alltasks:response.data})
  return response.data;
});

// Async thunk to add a new task
export const addTask = createAsyncThunk<Task, { projectId: string; taskData: Omit<Task, '_id'> }>(
  'tasks/addTask',
  async ({ projectId, taskData }) => {
    const response = await api.post(`/projects/${projectId}/tasks`, taskData);
    console.log({task: response.data});
    return response.data;
  }
);

// Async thunk to update an existing task
export const updateTask = createAsyncThunk<Task, { projectId: string; _id: string; taskData: Task }>(
  'tasks/updateTask',
  async ({ projectId, _id, taskData }) => {
    console.log({_id},"updateTasksSlice");
    const response = await api.put(`/projects/${projectId}/tasks/${_id}`, taskData);
    return response.data;
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addedTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updatedTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(task => task._id === action.payload._id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task._id !== action.payload);
    },
    deleteTasksByProjectId: (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter(task => task.projectId !== action.payload);
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      });
  },
});

export const { setTasks, addedTask, updatedTask, deleteTask ,deleteTasksByProjectId} = tasksSlice.actions;

export default tasksSlice.reducer;
