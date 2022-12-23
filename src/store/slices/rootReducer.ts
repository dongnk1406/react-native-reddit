import {authReducer} from './authSlice';
import {combineReducers} from '@reduxjs/toolkit';
import {customerReducer} from './customerSlice';
import {reservationReducer} from './reservationSlice';
import {languageReducer} from './languageSlice';
import {commonReducer} from './commonSlice';

const rootReducer = combineReducers({
  common: commonReducer,
  reservation: reservationReducer,
  customer: customerReducer,
  language: languageReducer,
  auth: authReducer,
});

export default rootReducer;
