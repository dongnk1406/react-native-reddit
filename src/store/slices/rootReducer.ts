import {combineReducers} from '@reduxjs/toolkit';
import {pokemonApi} from './pokemonSlice';
import {authReducer} from './authSlice';
import {customerReducer} from './customerSlice';
import {reservationReducer} from './reservationSlice';
import {commonReducer} from './commonSlice';

const rootReducer = combineReducers({
  common: commonReducer,
  reservation: reservationReducer,
  customer: customerReducer,
  auth: authReducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
});

export default rootReducer;
