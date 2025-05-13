// src/features/formReceiptSlip/documentRequestNumberSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DocumentRequestNumberState {
  documentRequestNumber: string;
}

const initialState: DocumentRequestNumberState = {
  documentRequestNumber: 'TB-DNNK-250001', // Default document request number
};

const documentRequestNumberSlice = createSlice({
  name: 'documentRequestNumber',
  initialState,
  reducers: {
    setDocumentRequestNumber(state, action: PayloadAction<string>) {
      state.documentRequestNumber = action.payload;
    },
  },
});

export const { setDocumentRequestNumber } = documentRequestNumberSlice.actions;
export default documentRequestNumberSlice.reducer;