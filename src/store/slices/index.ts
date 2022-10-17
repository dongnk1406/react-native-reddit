import {combineReducers} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import {customerReducer} from './customerSlice';
import {reservationReducer} from './reservationSlice';

const persistConfig = {
  key: 'reservation',
  storage: AsyncStorage,
  // whitelist: ['navigation'],
};

const rootReducer = combineReducers({
  reservation: persistReducer(persistConfig, reservationReducer),
  customer: customerReducer,
});

export default rootReducer;
