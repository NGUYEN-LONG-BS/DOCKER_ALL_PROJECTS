import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DocumentRequestNumberFilterState {
  documentRequestNumber: string;
}

const initialState: DocumentRequestNumberFilterState = {
  documentRequestNumber: '',
};

const documentRequestNumberFilterFormSlice = createSlice({
  name: 'documentRequestNumberFilterForm',
  initialState,
  reducers: {
    setDocumentRequestNumber(state, action: PayloadAction<string>) {
      state.documentRequestNumber = action.payload;
    },
    clearDocumentRequestNumber(state) {
      state.documentRequestNumber = '';
    },
  },
});

export const { setDocumentRequestNumber, clearDocumentRequestNumber } = documentRequestNumberFilterFormSlice.actions;
export default documentRequestNumberFilterFormSlice.reducer;