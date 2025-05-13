// src/features/formReceiptSlip/supplierSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Supplier {
  code: string;
  name: string;
  taxId: string;
  address: string;
}

interface SupplierState {
  supplier: Supplier;
}

const initialState: SupplierState = {
  supplier: {
    code: '',
    name: '',
    taxId: '',
    address: '',
  },
};

const supplierSlice = createSlice({
  name: 'supplier',
  initialState,
  reducers: {
    setSupplier(state, action: PayloadAction<Supplier>) {
      state.supplier = action.payload;
    },
  },
});

export const { setSupplier } = supplierSlice.actions;
export default supplierSlice.reducer;