// src/features/inventoryTable/inventoryTableSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    addItem: (state, action: PayloadAction<InventoryItemExport>) => {
      const newItem = { ...action.payload, id: state.items.length + 1 }; // Tạo ID dựa trên chiều dài mảng
      // Kiểm tra mã hàng và số lượng
      if (!newItem.code || newItem.quantity <= 0) {
        state.errorMessage = "Mã hàng không được trống và số lượng phải lớn hơn 0.";
        return;
      }
      // Kiểm tra trùng mã hàng
      const existingIndex = state.items.findIndex((item) => item.code === newItem.code);
      if (existingIndex !== -1) {
        // Thay thế mục hàng cũ nếu trùng mã
        state.items[existingIndex] = newItem;
      } else {
        state.items.push(newItem);
      }
      state.errorMessage = null;
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearItems: (state) => {
      state.items = [];
    },
    updateItem: (
          state,
          action: PayloadAction<{ id: number; field: keyof InventoryItemExport; value: string | number }>
        ) => {
      const { id, field, value } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        state.items[itemIndex] = { ...state.items[itemIndex], [field]: value };
        if (field === 'quantity' || field === 'price') {
          state.items[itemIndex].value = state.items[itemIndex].quantity * state.items[itemIndex].price;
        }
      }
    },
    setErrorMessage: (state, action: PayloadAction<string | null>) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { addItem, deleteItem, clearItems, updateItem, setErrorMessage } = inventoryTableSlice.actions;

export default inventoryTableSlice.reducer;