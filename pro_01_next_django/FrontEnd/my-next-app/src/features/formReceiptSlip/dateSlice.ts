// src/features/formReceiptSlip/dateSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//  Phần khai báo state để lưu ngày
interface DateState {
  date: string;
}

const initialState: DateState = {
  date: new Date().toISOString().split('T')[0], // Default to today's date
};

//  Phần khai báo reducers để thay đổi state
const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setDate(state, action: PayloadAction<string>) {
      state.date = action.payload; //  Đổi state.date thành action.payload
    },
  },
});

export const { setDate } = dateSlice.actions;
export default dateSlice.reducer;