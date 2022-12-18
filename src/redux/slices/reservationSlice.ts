import {createSlice, PayloadAction} from '@reduxjs/toolkit';

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

export const reservationReducer = reservationSlice.reducer;
export const {addReservation, removeReservation} = reservationSlice.actions;
