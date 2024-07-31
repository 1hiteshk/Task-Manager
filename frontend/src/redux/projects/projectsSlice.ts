import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/utils/api';

export interface Project {
  _id: string;
  projectNumber: number;
  projectTitle: string;
  userId: string | any;
  createdAt?: string | any;
  updatedAt?: string | any;
}

interface ProjectsState {
  projects: Project[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  status: 'idle',
  error: null,
};

// Async thunk to fetch projects
export const fetchProjects = createAsyncThunk<Project[]>('projects/fetchProjects', async () => {
  const response = await api.get('/projects');
  return response.data;
});

// Async thunk to add a new project
export const addProject = createAsyncThunk<Project, Omit<Project, '_id'>>('projects/addProject', async (projectData) => {
  const response = await api.post('/projects', projectData);
  return response.data;
});

// Async thunk to update an existing project
export const updateProject = createAsyncThunk<Project, Project>('projects/updateProject', async (projectData) => {
  const response = await api.put(`/projects/${projectData._id}`, projectData);
  return response.data;
});

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setUserProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
    addUserProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
    updateUserProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex(p => p._id === action.payload._id);
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
    removeUserProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(p => p._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (state, action: PayloadAction<Project[]>) => {
        state.status = 'succeeded';
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch projects';
      })
      .addCase(addProject.fulfilled, (state, action: PayloadAction<Project>) => {
        state.projects.push(action.payload);
      })
      .addCase(updateProject.fulfilled, (state, action: PayloadAction<Project>) => {
        const index = state.projects.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      });
  },
});

export const { setUserProjects, addUserProject, updateUserProject, removeUserProject } = projectsSlice.actions;
export default projectsSlice.reducer;
