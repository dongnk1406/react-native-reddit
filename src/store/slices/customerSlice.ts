import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Customer {
  id: string;
  name: string;
  food: string[];
}

interface CustomerState {
  value: Customer[];
}

interface AddFoodToCustomerPayload {
  food: string;
  id: string;
}

const initialState: CustomerState = {
  value: [],
};

export const customerSlice = createSlice({
  name: 'customer',
  initialState: initialState,
  reducers: {
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.value.push(action.payload);
    },
  },
});

export const customerReducer = customerSlice.reducer;
export const {addCustomer} = customerSlice.actions;
