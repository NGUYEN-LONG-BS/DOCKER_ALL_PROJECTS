import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../store/store';

export interface InventoryItemExport {
  id: number;
  code: string;
  name: string;
  unit: string;
  quantity: number;
  price: number;
  value: number;
  notes: string;
}

interface InventoryTableState {
  items: InventoryItemExport[];
  errorMessage: string | null;
}

const initialState: InventoryTableState = {
  items: [],
  errorMessage: null,
};

const inventoryTableSlice = createSlice({
  name: 'inventoryTable',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<InventoryItemExport>) {
      state.items.push(action.payload);
    },
    deleteItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
    },
    updateItem(
      state,
      action: PayloadAction<{
        id: number;
        field: keyof InventoryItemExport;
        value: string | number;
      }>
    ) {
      const { id, field, value } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        (item[field] as any) = value;
        if (field === 'quantity' || field === 'price') {
          item.value = item.quantity * item.price;
        }
      }
    },
    setErrorMessage(state, action: PayloadAction<string | null>) {
      state.errorMessage = action.payload;
    },
    setItems(state, action: PayloadAction<InventoryItemExport[]>) {
      state.items = action.payload;
    },
  },
});

export const {
  addItem,
  deleteItem,
  clearItems,
  updateItem,
  setErrorMessage,
  setItems,
} = inventoryTableSlice.actions;

export default inventoryTableSlice.reducer;