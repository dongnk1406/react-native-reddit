import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

interface ReservationState {
  value: string[];
}

const initialState: ReservationState = {
  value: ['One'],
};

export const reservationSlice = createSlice({
  name: 'reservation',
  initialState: initialState,
  reducers: {
    addReservation: (state, action: PayloadAction<string>) => {
      state.value.push(action.payload);
    },
    removeReservation: (state, action: PayloadAction<number>) => {
      state.value.splice(action.payload, 1);
    },
  },
});

const reservationPersistConfig = {
  key: 'reservation',
  storage: AsyncStorage,
  // whitelist: ['navigation'],
};

export const reservationReducer = persistReducer(
  reservationPersistConfig,
  reservationSlice.reducer,
);
export const {addReservation, removeReservation} = reservationSlice.actions;
