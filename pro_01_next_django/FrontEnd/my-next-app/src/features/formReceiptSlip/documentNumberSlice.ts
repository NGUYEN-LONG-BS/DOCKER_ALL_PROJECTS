// src/features/formReceiptSlip/documentNumberSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DocumentNumberState {
  documentNumber: string;
}

const initialState: DocumentNumberState = {
  documentNumber: 'TB-PNK-250001', // Default document number
};

const documentNumberSlice = createSlice({
  name: 'documentNumber',
  initialState,
  reducers: {
    setDocumentNumber(state, action: PayloadAction<string>) {
      state.documentNumber = action.payload;
    },
  },
});

export const { setDocumentNumber } = documentNumberSlice.actions;
export default documentNumberSlice.reducer;