import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import counterSlice from '../redux/counter/counterSlice';
import loginReducer from "@/redux/login/loginSlice";
import userInfoReducer from '@/redux/user/userInfoSlice';
import projectsReducer from '@/redux/projects/projectsSlice';
import tasksReducer from '@/redux/tasks/tasksSlice';


const rootReducer = combineReducers({
  counter: counterSlice,
  user: loginReducer,
  userDetails: userInfoReducer,
  projects: projectsReducer,
  tasks: tasksReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

