import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./userDetails";
import Logindetails from "./userLogin";
import profileDetails from './ProfileDetails';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // Assuming localStorage

// Configuration for persisting the 'ProfileData' slice
const persistConfig = {
  key: 'ProfileData',
  version: 1,
  storage,
};

// Persist the 'profileDetails' slice using redux-persist
const ProfilePersist = persistReducer(persistConfig, profileDetails);

// Combine all reducers
const rootReducer = combineReducers({
  authSlice: authReducer,
  authLogin: Logindetails,
  ProfileData: ProfilePersist, // Include the persisted 'profileDetails' slice
});

// Configure the Redux store
const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
