import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {};

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {},
});

export const authReducer = authSlice.reducer;
export const {} = authSlice.actions;
