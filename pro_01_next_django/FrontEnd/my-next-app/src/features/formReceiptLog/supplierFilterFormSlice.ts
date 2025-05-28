import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SupplierFilter {
  code: string;
  name: string;
  taxId: string;
  address: string;
}

interface SupplierFilterState {
  supplier: SupplierFilter;
}

const initialState: SupplierFilterState = {
  supplier: {
    code: '',
    name: '',
    taxId: '',
    address: '',
  },
};

const supplierFilterFormSlice = createSlice({
  name: 'supplierFilterForm',
  initialState,
  reducers: {
    setSupplier(state, action: PayloadAction<SupplierFilter>) {
      state.supplier = action.payload;
    },
    clearSupplier(state) {
      state.supplier = { code: '', name: '', taxId: '', address: '' };
    },
  },
});

export const { setSupplier, clearSupplier } = supplierFilterFormSlice.actions;
export default supplierFilterFormSlice.reducer;