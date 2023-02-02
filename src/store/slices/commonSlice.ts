import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import {persistConfig} from './config';

interface ICommonState {
  loading: boolean;
  theme: string;
  language: string;
}

const initialState: ICommonState = {
  loading: false,
  theme: 'light',
  language: 'vn',
};

export const commonSlice = createSlice({
  name: 'common',
  initialState: initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<any>) => {
      state.loading = action.payload;
    },
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
    updateLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const commonReducer = persistReducer(
  persistConfig('common'),
  commonSlice.reducer,
);

export const {setLoading, setTheme, updateLanguage} = commonSlice.actions;
