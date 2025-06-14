// src/features/inventoryTable/inventoryTableSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../store/store';
import axios from 'axios';
import { API_check_ma_hang } from '@/api/api';

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
      const newItem = { ...action.payload, id: state.items.length + 1 };
      state.items.push(newItem); // Thêm trực tiếp vào state sau khi kiểm tra

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
    setItems(state, action: PayloadAction<InventoryItemExport[]>) {
          state.items = action.payload;
        },
  },
});

// Action creator bất đồng bộ để kiểm tra ma_hang trước khi thêm vào bảng
export const addItemWithValidation = (item: InventoryItemExport) => {
  return async (dispatch: AppDispatch) => {
    // Kiểm tra mã hàng và số lượng
    if (!item.code || item.quantity <= 0) {
      dispatch(setErrorMessage("Mã hàng không được trống và số lượng phải lớn hơn 0."));
      return;
    }

    // Kiểm tra ma_hang qua API
    try {
      const response = await axios.get(
        `${API_check_ma_hang}?ma_hang=${encodeURIComponent(item.code)}`,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (!response.data.existed) {
        dispatch(setErrorMessage(`Mã hàng ${item.code} không tồn tại trong danh mục hàng hóa.`));
        return;
      }

      // Nếu tất cả kiểm tra đều qua, thêm item
      dispatch(addItem(item));
    } catch (error: any) {
      console.error("Lỗi khi kiểm tra mã hàng:", error);
      dispatch(setErrorMessage("Không thể kiểm tra mã hàng. Vui lòng thử lại."));
    }
  };
};

export const { 
  addItem, 
  deleteItem, 
  clearItems, 
  updateItem, 
  setErrorMessage,
  setItems,
} = inventoryTableSlice.actions;

export default inventoryTableSlice.reducer;