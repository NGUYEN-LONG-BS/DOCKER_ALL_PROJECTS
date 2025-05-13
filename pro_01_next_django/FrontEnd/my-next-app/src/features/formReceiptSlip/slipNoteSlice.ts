// src/features/formReceiptSlip/slipNoteSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SlipNote {
  selectedWarehouse: string;
  notesOfSlip: string;
}

interface SlipNoteState {
  slipNote: SlipNote;
}

const initialState: SlipNoteState = {
  slipNote: {
    selectedWarehouse: 'Kho A',
    notesOfSlip: '',
  },
};

const slipNoteSlice = createSlice({
  name: 'slipNote',
  initialState,
  reducers: {
    setSlipNote(state, action: PayloadAction<SlipNote>) {
      state.slipNote = action.payload;
    },
  },
});

export const { setSlipNote } = slipNoteSlice.actions;
export default slipNoteSlice.reducer;