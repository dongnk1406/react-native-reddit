import {persistReducer} from 'redux-persist';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {persistConfig} from './config';

interface User {
  userPhone: string | null;
  userToken: string | null;
}

const initialState: User = {
  userPhone: '',
  userToken: '',
};

export const authSlice = createSlice({
  name: 'authentication',
  initialState: initialState,
  reducers: {
    signIn: (state, action: PayloadAction<any>) => {
      state.userToken = action.payload[0]?.userToken;
      state.userPhone = action.payload[0]?.userPhone;
    },
    signOut: state => {
      state.userPhone = null;
      state.userToken = null;
    },
    restoreToken: (state, action: PayloadAction<any>) => {
      state.userToken = action.payload?.token;
    },
  },
});

export const authReducer = persistReducer(
  persistConfig('authentication'),
  authSlice.reducer,
);
export const {signIn, signOut, restoreToken} = authSlice.actions;
