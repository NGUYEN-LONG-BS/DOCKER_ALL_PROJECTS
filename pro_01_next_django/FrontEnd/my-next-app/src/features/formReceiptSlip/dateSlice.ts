// src/features/formReceiptSlip/dateSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DATE_SELECTED_ACTION } from '@/actions/dateTimeActions';

interface DateState {
  date: string;
}

const initialState: DateState = {
  date: new Date().toISOString().split('T')[0], // Default to today's date
};

const dateSlice = createSlice({
  name: DATE_SELECTED_ACTION,
  initialState,
  reducers: {
    setDate(state, action: PayloadAction<string>) {
      state.date = action.payload;
    },
  },
});

export const { setDate } = dateSlice.actions;
export default dateSlice.reducer;