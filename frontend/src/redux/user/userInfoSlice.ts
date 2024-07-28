import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {};

export const userInfoSlice = createSlice({
  name: "user-info",
  initialState: initialState,
  reducers: {
    setUserInfo: (state, action) => {
        return { ...state, ...action.payload };
    },
    
  },
});

export const { setUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
