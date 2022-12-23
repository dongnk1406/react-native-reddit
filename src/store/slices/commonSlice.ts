import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ICommonState {
  loading: boolean;
}

const initialState: ICommonState = {
  loading: false,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState: initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<any>) => {
      state.loading = action.payload;
    },
  },
});

export const commonReducer = commonSlice.reducer;
export const {setLoading} = commonSlice.actions;
