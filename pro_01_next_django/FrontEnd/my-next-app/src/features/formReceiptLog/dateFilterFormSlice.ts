import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DateFilterState {
  dateStart: string;
  dateEnd: string;
}

const today = new Date().toISOString().split('T')[0];

const initialState: DateFilterState = {
  dateStart: today,
  dateEnd: today,
};

const dateFilterFormSlice = createSlice({
  name: 'dateFilterForm',
  initialState,
  reducers: {
    setDateStart(state, action: PayloadAction<string>) {
      state.dateStart = action.payload;
    },
    setDateEnd(state, action: PayloadAction<string>) {
      state.dateEnd = action.payload;
    },
    setDateRange(state, action: PayloadAction<{ dateStart: string; dateEnd: string }>) {
      state.dateStart = action.payload.dateStart;
      state.dateEnd = action.payload.dateEnd;
    },
    clearDateFilter(state) {
      state.dateStart = today;
      state.dateEnd = today;
    },
  },
});

export const { setDateStart, setDateEnd, setDateRange, clearDateFilter } = dateFilterFormSlice.actions;
export default dateFilterFormSlice.reducer;