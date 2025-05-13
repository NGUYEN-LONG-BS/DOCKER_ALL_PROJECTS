// src/features/objectProductComponent/objectProductComponentSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// ==== 1. Định nghĩa kiểu dữ liệu ====
export interface ProductData {
  code: string;
  name: string;
  unit: string;
}

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

export interface ProductState {
  Product: ProductData;
  inventoryItem: InventoryItemExport;
  searchText: string;
  filteredProducts: ProductData[];
  showDropdown: boolean;
  loading: boolean;
  quantity: string;
  unitPrice: string;
  value: string;
  notes: string;
  mockProducts: ProductData[];
  highlightedIndex: number;
  items: InventoryItemExport[];
  errorMessage: string | null;
}

// ==== 2. Khởi tạo state ban đầu ====
const initialState: ProductState = {
  Product: { code: '', name: '', unit: '' },
  inventoryItem: { id: 0, code: '', name: '', unit: '', quantity: 0, price: 0, value: 0, notes: '' },
  searchText: '',
  filteredProducts: [],
  showDropdown: false,
  loading: false,
  quantity: '',
  unitPrice: '',
  value: '',
  notes: '',
  mockProducts: [],
  highlightedIndex: -1,
  items: [],
  errorMessage: null,
};

// ==== 3. AsyncThunk gọi API lấy danh sách sản phẩm ====
export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8000/api/get-inventory-categories/');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data.map((item: { ma_hang: string; ten_hang: string; dvt: string }) => ({
        code: item.ma_hang,
        name: item.ten_hang,
        unit: item.dvt,
      }));
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// ==== 4. Tạo slice Redux ====
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSearchText: (state, action: PayloadAction<string>) => {
      console.log("setSearchText", action.payload);
      state.searchText = action.payload;
    },
    setFilteredProducts: (state, action: PayloadAction<ProductData[]>) => {
      state.filteredProducts = action.payload;
    },
    setShowDropdown: (state, action: PayloadAction<boolean>) => {
      state.showDropdown = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setProduct: (state, action: PayloadAction<ProductData>) => {
      state.Product = action.payload;
    },
    setInventoryItem: (state, action: PayloadAction<InventoryItemExport>) => {
      state.inventoryItem = action.payload;
    },
    setQuantity: (state, action: PayloadAction<string>) => {
      state.quantity = action.payload;
      const qty = parseFloat(action.payload.replace(/\./g, '')) || 0;
      state.inventoryItem.quantity = qty;
      state.inventoryItem.value = qty * state.inventoryItem.price;
      state.value = formatNumber(state.inventoryItem.value.toString());
    },
    setUnitPrice: (state, action: PayloadAction<string>) => {
      state.unitPrice = action.payload;
      const price = parseFloat(action.payload.replace(/\./g, '')) || 0;
      state.inventoryItem.price = price;
      state.inventoryItem.value = state.inventoryItem.quantity * price;
      state.value = formatNumber(state.inventoryItem.value.toString());
    },
    setNotes: (state, action: PayloadAction<string>) => {
      state.notes = action.payload;
      state.inventoryItem.notes = action.payload;
    },
    setHighlightedIndex: (state, action: PayloadAction<number>) => {
      state.highlightedIndex = action.payload;
    },
    filterProducts: (state, action: PayloadAction<string>) => {
      state.loading = true;
      const text = action.payload;
      const filtered = state.mockProducts.filter(
        (s) =>
          s.code.toLowerCase().includes(text.toLowerCase()) ||
          s.name.toLowerCase().includes(text.toLowerCase())
      );
      state.filteredProducts = filtered;
      state.loading = false;
      state.showDropdown = true;
    },
    selectProduct: (state, action: PayloadAction<ProductData>) => {
      state.Product = action.payload;
      state.searchText = action.payload.code;
      state.filteredProducts = [];
      state.showDropdown = false;
      state.quantity = '';
      state.unitPrice = '';
      state.value = '';
      state.notes = '';
      state.inventoryItem = {
        id: Date.now(),
        code: action.payload.code,
        name: action.payload.name,
        unit: action.payload.unit,
        quantity: 0,
        price: 0,
        value: 0,
        notes: '',
      };
    },
    addItem: (state, action: PayloadAction<InventoryItemExport>) => {
      const newItem = { ...action.payload, id: state.items.length + 1 };
      const existingIndex = state.items.findIndex((item) => item.code === newItem.code);
      if (existingIndex !== -1) {
        state.items = [
          ...state.items.slice(0, existingIndex),
          newItem,
          ...state.items.slice(existingIndex + 1),
        ].map((item, index) => ({ ...item, id: index + 1 }));
      } else {
        state.items = [...state.items, newItem].map((item, index) => ({
          ...item,
          id: index + 1,
        }));
      }
      state.errorMessage = null;
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.items = state.items
        .filter((item) => item.id !== action.payload)
        .map((item, index) => ({ ...item, id: index + 1 }));
    },
    clearItems: (state) => {
      state.items = [];
    },
    updateItem: (state, action: PayloadAction<{ id: number; field: keyof InventoryItemExport; value: any }>) => {
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.mockProducts = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

// ==== 6. Hàm tiện ích để định dạng số thành 'x.xxx' ====
const formatNumber = (value: string): string => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

// ==== 7. Export các action ====
export const {
  setSearchText,
  setFilteredProducts,
  setShowDropdown,
  setLoading,
  setProduct,
  setInventoryItem,
  setQuantity,
  setUnitPrice,
  setNotes,
  setHighlightedIndex,
  filterProducts,
  selectProduct,
  addItem,
  deleteItem,
  clearItems,
  updateItem,
  setErrorMessage,
} = productSlice.actions;

// ==== 8. Export reducer để dùng trong store ====
export default productSlice.reducer;