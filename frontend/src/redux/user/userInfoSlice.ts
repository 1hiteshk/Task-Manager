import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userProfile from '@/hooks/userProfile';

export interface UserState {
  email: string;
  id: string;
  username: string;
}

const initialState: UserState = {
  email: '',
  id: '',
  username: ''
};

// Async thunk to fetch user info
export const fetchUserInfo = createAsyncThunk<UserState>('user/fetchUserInfo', async () => {
  const user = await userProfile();
  return user;
});

const userInfoSlice = createSlice({
  name: 'user-info',
  initialState,
  reducers: {
    // Reducer to manually set user info if needed
    setUserInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle the fulfilled state of fetchUserInfo
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        return { ...action.payload };
      });
  },
});

export const { setUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
