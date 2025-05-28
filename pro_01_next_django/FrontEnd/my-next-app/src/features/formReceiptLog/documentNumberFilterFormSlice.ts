import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DocumentNumberFilterState {
  documentNumber: string;
}

const initialState: DocumentNumberFilterState = {
  documentNumber: '',
};

const documentNumberFilterFormSlice = createSlice({
  name: 'documentNumberFilterForm',
  initialState,
  reducers: {
    setDocumentNumber(state, action: PayloadAction<string>) {
      state.documentNumber = action.payload;
    },
    clearDocumentNumber(state) {
      state.documentNumber = '';
    },
  },
});

export const { setDocumentNumber, clearDocumentNumber } = documentNumberFilterFormSlice.actions;
export default documentNumberFilterFormSlice.reducer;