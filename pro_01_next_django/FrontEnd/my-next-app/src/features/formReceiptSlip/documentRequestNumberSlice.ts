// src/features/formReceiptSlip/documentRequestNumberSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DOCUMENT_REQUEST_NUMBER_SELECTED_ACTION } from '@/actions/documentRequestNumberActions';

interface DocumentRequestNumberState {
  documentRequestNumber: string;
}

const currentYear = new Date().getFullYear().toString().slice(-2);
const initialState: DocumentRequestNumberState = {
  documentRequestNumber: `TB-DNNK-${currentYear}0001`,
};

const documentRequestNumberSlice = createSlice({
  name: DOCUMENT_REQUEST_NUMBER_SELECTED_ACTION,
  initialState,
  reducers: {
    setDocumentRequestNumber(state, action: PayloadAction<string>) {
      state.documentRequestNumber = action.payload;
    },
  },
});

export const { setDocumentRequestNumber } = documentRequestNumberSlice.actions;
export default documentRequestNumberSlice.reducer;