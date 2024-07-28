import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
  isLoggedIn: boolean;
  isDataFetched: boolean;
}

const initialState: IAuthState = {
  isLoggedIn: false,
  isDataFetched: false,
};

const loginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    user: (state) => {
      console.log("login reducer");
      state.isLoggedIn = true;
      console.log(state.isLoggedIn ? "Logged IN" : "Logged OUT");
    },
    setDataFetched: (state) => {
      state.isDataFetched = true;
    },
    userLogout: (state) => {
      state.isLoggedIn = false;
      state.isDataFetched = false;
      console.log("logout reducer");
    },
  },
});

export const { user, userLogout, setDataFetched } = loginSlice.actions;
export default loginSlice.reducer;
