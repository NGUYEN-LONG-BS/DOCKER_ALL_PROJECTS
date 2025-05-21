import { createSlice, createAsyncThunk } from '@reduxjslayers/inventorySlice';
import axios from 'axios';

// Define the InventoryItem interface based on API data
interface InventoryItem {
  id: number;
  so_phieu: string;
  ngay_tren_phieu: string;
  so_phieu_de_nghi: string;
  ma_doi_tuong: string;
  ten_doi_tuong?: string;
  ma_hang: string;
  ten_hang?: string;
  so_luong: number;
  ma_kho_nhan: string;
}

// State shape
interface InventoryState {
  items: InventoryItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: InventoryState = {
  items: [],
  status: 'idle',
  error: null,
};

// Async thunk to fetch inventory data
export const fetchInventory = createAsyncThunk('inventory/fetchInventory', async () => {
  const response = await axios.get('http://127.0.0.1:8000/api/inventory-stock/');
  return response.data.map((item: any) => ({
    id: item.STT,
    so_phieu: item.so_phieu,
    ngay_tren_phieu: item.ngay_tren_phieu,
    so_phieu_de_nghi: item.so_phieu_de_nghi,
    ma_doi_tuong: item.ma_doi_tuong,
    ten_doi_tuong: '',
    ma_hang: item.ma_hang,
    ten_hang: '',
    so_luong: parseFloat(item.so_luong),
    ma_kho_nhan: item.ma_kho_nhan,
  }));
});

// Create the slice
const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    addItem: (state, action: { payload: InventoryItem }) => {
      const existingIndex = state.items.findIndex(item => item.ma_hang === action.payload.ma_hang);
      if (existingIndex !== -1) {
        state.items[existingIndex] = action.payload;
      } else {
        state.items.push(action.payload);
      }
      state.items = state.items.map((item, index) => ({
        ...item,
        id: index + 1,
      }));
    },
    updateItem: (state, action: { payload: { id: number; field: keyof InventoryItem; value: any } }) => {
      const { id, field, value } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        (item[field] as any) = value;
      }
    },
    deleteItem: (state, action: { payload: number }) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.items = state.items.map((item, index) => ({
        ...item,
        id: index + 1,
      }));
    },
    clearItems: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload || [];
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch inventory';
        state.items = [];
      });
  },
});

// Export actions
export const { addItem, updateItem, deleteItem, clearItems } = inventorySlice.actions;

// Export reducer
export default inventorySlice.reducer;