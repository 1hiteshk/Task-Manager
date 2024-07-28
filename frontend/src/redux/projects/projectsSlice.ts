import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteTasksByProjectId } from '@/redux/tasks/tasksSlice';

interface Project {
    _id: string | any | undefined;
    projectNumber: number | string;
    projectTitle: string;
    userId?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  

interface ProjectsState {
  projects: Project[];
}

const initialState: ProjectsState = {
  projects: [],
};

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
});

export const { setUserProjects, addUserProject, updateUserProject, removeUserProject } = projectsSlice.actions;
export default projectsSlice.reducer;
