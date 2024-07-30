
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/utils/api';

type ProjectDetails = any;

interface ProjectDetailsState {
  projectDetailsMap: Record<string, ProjectDetails>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProjectDetailsState = {
  projectDetailsMap: {},
  status: 'idle',
  error: null,
};

// Async thunk to fetch projects
export const fetchProjectDetails = createAsyncThunk<ProjectDetails, string>('projectDetails/fetchProjectDetails', async (id: string) => {
  const response = await api.get(`/projects/${id}`);
  return {
    data: response.data,
    key: id
  }
});


const projectDetailsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setUserProjects: (state, action: PayloadAction<ProjectDetails>) => {
      state.projectDetailsMap = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjectDetails.fulfilled, (state, action: PayloadAction<ProjectDetails>) => {
        const { data, key } = action.payload;
        state.status = 'succeeded';
        // Will set the data according to the projectId
        if (!state.projectDetailsMap?.id && key) {
          state.projectDetailsMap[key] = data;
        }
      })
      .addCase(fetchProjectDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch projects';
      });
  },
});

export const { setUserProjects } = projectDetailsSlice.actions;
export default projectDetailsSlice.reducer;