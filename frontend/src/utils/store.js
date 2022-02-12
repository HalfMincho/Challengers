import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger/src';
import accountSlice from '../features/account/AccountSlice';
// import apiLogSlice from '../features/challenge/ApiLogSlice';

const reducer = combineReducers({
  account: accountSlice.reducer,
  // apiLog: apiLogSlice.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});
