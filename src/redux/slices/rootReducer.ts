import {combineReducers} from '@reduxjs/toolkit';
import {customerReducer} from './customerSlice';
import {reservationReducer} from './reservationSlice';
import {languageReducer} from './languageSlice';

const rootReducer = combineReducers({
  reservation: reservationReducer,
  customer: customerReducer,
  language: languageReducer,
});

export default rootReducer;
