import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

interface ILanguageState {
  key: string;
}

const initialState: ILanguageState = {
  key: '',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    updateLanguageKey: (state, action) => {
      state.key = action.payload;
    },
  },
});

const languagePersistConfig = {
  key: 'language',
  storage: AsyncStorage,
};

export const languageReducer = persistReducer(
  languagePersistConfig,
  languageSlice.reducer,
);
export const {updateLanguageKey} = languageSlice.actions;
