import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Customer {
  id: string | number;
  name: string;
  food: string[];
}

interface ICustomerState {
  value: Customer[];
}

interface AddFoodToCustomerPayload {
  food: string;
  id: string;
}

const initialState: ICustomerState = {
  value: [
    {
      id: 1,
      name: 'Hello',
      food: ['Cake', 'Cream'],
    },
  ],
};

export const customerSlice = createSlice({
  name: 'customer',
  initialState: initialState,
  reducers: {
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.value.push(action.payload);
    },
    addFoodCustomer: (
      state,
      action: PayloadAction<AddFoodToCustomerPayload>,
    ) => {
      state.value.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserThunk.pending, (state, action) => {
        console.log(
          'state fetchUserThunk pending',
          state,
          '\naction fetchUserThunk payload\n',
          action.payload,
        );
      })
      .addCase(fetchUserThunk.fulfilled, (state, action) => {
        console.log(
          'state fetchUserThunk fulfilled',
          state,
          '\naction fetchUserThunk payload\n',
          action.payload,
        );
      })
      .addCase(addUserThunk.fulfilled, (state, action) => {
        console.log(
          'state addUserThunk fulfilled',
          state,
          '\naction addUserThunk payload\n',
          action.payload,
        );
      });
  },
});

export const fetchUserThunk = createAsyncThunk('fetchUserThunk', async () => {
  const response = await fetch(
    'https://62ff2c7134344b6431f3db0c.mockapi.io/api/v1/list-friend',
  );
  const data = await response.json();
  return data;
});

export const addUserThunk = createAsyncThunk('addUserThunk', async () => {
  const response = await fetch(
    'https://62ff2c7134344b6431f3db0c.mockapi.io/api/v1/list-friend',
  );
  const data = await response.json();
  return data;
});

export const customerReducer = customerSlice.reducer;
export const {addCustomer} = customerSlice.actions;
