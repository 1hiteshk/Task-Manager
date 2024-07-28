import { configureStore } from "@reduxjs/toolkit";
import counterSlice from '../redux/counter/counterSlice';
import loginReducer from "@/redux/login/loginSlice";
import userInfoReducer from '@/redux/user/userInfoSlice';
import projectsReducer from '@/redux/projects/projectsSlice';
import tasksReducer from '@/redux/tasks/tasksSlice';


export const store = configureStore({
    reducer:{
      counter: counterSlice,
      user: loginReducer,
      userDetails: userInfoReducer,
      projects: projectsReducer,
      tasks: tasksReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

