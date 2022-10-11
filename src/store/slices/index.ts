import {combineReducers} from '@reduxjs/toolkit';
import {customerReducer} from './customerSlice';
import {reservationReducer} from './reservationSlice';

const rootReducer = combineReducers({
  reservation: reservationReducer,
  customer: customerReducer,
});

export default rootReducer;
