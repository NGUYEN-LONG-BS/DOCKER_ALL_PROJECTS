import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store/store';
import axios from 'axios';
import { API_CHECK_INVENTORY_CODE_EXIST } from '@/api/api';

export interface InventoryItemExport {
  id: number;
  code: string;
  name: string;
  unit: string;
  quantity: number; // Giá trị số đã parse, dùng để tính toán
  price: number; // Giá trị số đã parse, dùng để tính toán
  value: number; // Giá trị tính toán (quantity * price)
  notes: string;
  rawQuantity: string; // Giá trị thô khi người dùng nhập
  rawPrice: string; // Giá trị thô khi người dùng nhập
}

interface InventoryTableState {
  items: InventoryItemExport[];
  errorMessage: string | null;
}

const initialState: InventoryTableState = {
  items: [],
  errorMessage: null,
};

// Hàm định dạng số với dấu phân cách hàng nghìn và phần thập phân
export const formatNumber = (value: string | number): string => {
  if (!value && value !== 0) return "";
  const num = parseFloat(value.toString().replace(/,/g, ""));
  if (isNaN(num)) return "";
  return num.toLocaleString("en-US", {
    minimumFractionDigits: Number.isInteger(num) ? 0 : 2,
    maximumFractionDigits: 2,
  }).replace(/\.00$/, ""); // Loại bỏ .00 nếu là số nguyên
};

const inventoryTableSlice = createSlice({
  name: 'inventoryTable',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<InventoryItemExport>) => {
      const newItem = {
        ...action.payload,
        id: state.items.length + 1,
        quantity: Number(action.payload.quantity),
        price: Number(action.payload.price),
        value: Number(action.payload.quantity) * Number(action.payload.price),
        rawQuantity: formatNumber(action.payload.quantity), // Định dạng khi thêm
        rawPrice: formatNumber(action.payload.price), // Định dạng khi thêm
      };
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
          state.items[itemIndex].value =
            Number(state.items[itemIndex].quantity) * Number(state.items[itemIndex].price);
          // Định dạng rawQuantity/rawPrice khi cập nhật
          if (field === 'quantity') {
            state.items[itemIndex].rawQuantity = formatNumber(value);
          } else if (field === 'price') {
            state.items[itemIndex].rawPrice = formatNumber(value);
          }
        }
      }
    },
    setRawValue: (
      state,
      action: PayloadAction<{ id: number; field: 'rawQuantity' | 'rawPrice'; value: string }>
    ) => {
      const { id, field, value } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        state.items[itemIndex][field] = value;
      }
    },
    setErrorMessage: (state, action: PayloadAction<string | null>) => {
      state.errorMessage = action.payload;
    },
    setItems: (state, action: PayloadAction<InventoryItemExport[]>) => {
      state.items = action.payload.map((item) => ({
        ...item,
        quantity: Number(item.quantity),
        price: Number(item.price),
        value: Number(item.quantity) * Number(item.price),
        rawQuantity: formatNumber(item.quantity), // Định dạng khi set
        rawPrice: formatNumber(item.price), // Định dạng khi set
      }));
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
        `${API_CHECK_INVENTORY_CODE_EXIST}?ma_hang=${encodeURIComponent(item.code)}`,
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
  setRawValue,
  setErrorMessage,
  setItems,
} = inventoryTableSlice.actions;

export default inventoryTableSlice.reducer;