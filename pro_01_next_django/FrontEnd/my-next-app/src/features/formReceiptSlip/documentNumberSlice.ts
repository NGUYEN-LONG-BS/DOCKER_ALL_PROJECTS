// src/features/formReceiptSlip/documentNumberSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DOCUMENT_NUMBER_SELECTED_ACTION } from '@/actions/documentNumberActions';

interface DocumentNumberState {
  documentNumber: string;
}

const currentYear = new Date().getFullYear().toString().slice(-2);
const initialState: DocumentNumberState = {
  documentNumber: `TB-PNK-${currentYear}0001`,
};

const documentNumberSlice = createSlice({
  name: DOCUMENT_NUMBER_SELECTED_ACTION,
  initialState,
  reducers: {
    setDocumentNumber(state, action: PayloadAction<string>) {
      state.documentNumber = action.payload;
    },
  },
});

export const { setDocumentNumber } = documentNumberSlice.actions;
export default documentNumberSlice.reducer;