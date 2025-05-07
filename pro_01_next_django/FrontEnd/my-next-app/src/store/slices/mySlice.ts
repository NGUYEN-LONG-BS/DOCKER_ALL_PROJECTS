import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MyState {
  value: number;
}

const initialState: MyState = {
  value: 0,
};

const mySlice = createSlice({
  name: 'myFeature',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = mySlice.actions;
export default mySlice.reducer;
