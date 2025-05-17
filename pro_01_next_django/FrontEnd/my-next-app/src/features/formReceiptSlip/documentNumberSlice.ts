// src/features/formReceiptSlip/documentNumberSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { API_new_number_slip_pnk } from '@/api/api';
import { DOCUMENT_NUMBER_SELECTED_ACTION } from '@/actions/documentNumberActions';

interface DocumentNumberState {
  documentNumber: string;
  loading: boolean;
  error: string | null;
}

const currentYear = new Date().getFullYear().toString().slice(-2);
const initialState: DocumentNumberState = {
  documentNumber: `TB-PNK-${currentYear}0001`,
  loading: false,
  error: null,
};

export const fetchNewDocumentNumber = createAsyncThunk(
  'documentNumber/fetchNewDocumentNumber',
  async (_, { dispatch }) => {
    try {
      const response = await fetch(API_new_number_slip_pnk, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to fetch new document number');
      const data = await response.json();
      return data.new_number_slip;
    } catch (error) {
      return `TB-PNK-${currentYear}0001`;
    }
  }
);

const documentNumberSlice = createSlice({
  name: DOCUMENT_NUMBER_SELECTED_ACTION,
  initialState,
  reducers: {
    setDocumentNumber(state, action: PayloadAction<string>) {
      state.documentNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
      builder
        .addCase(fetchNewDocumentNumber.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchNewDocumentNumber.fulfilled, (state, action) => {
          state.loading = false;
          state.documentNumber = action.payload;
        })
        .addCase(fetchNewDocumentNumber.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to fetch new number';
        });
    },
});

export const { setDocumentNumber } = documentNumberSlice.actions;
export default documentNumberSlice.reducer;