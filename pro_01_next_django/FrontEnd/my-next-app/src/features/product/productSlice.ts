import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Define interfaces
interface ProductData {
  code: string;
  name: string;
  unit: string;
}

interface InventoryItemExport {
  id: number;
  code: string;
  name: string;
  unit: string;
  quantity: number;
  price: number;
  notes: string;
}

interface ProductState {
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
}

// Initial state
const initialState: ProductState = {
  Product: { code: '', name: '', unit: '' },
  inventoryItem: { id: 0, code: '', name: '', unit: '', quantity: 0, price: 0, notes: '' },
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
};

// Async thunk to fetch products
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

// Create slice
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSearchText: (state, action: PayloadAction<string>) => {
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
      const price = parseFloat(state.unitPrice.replace(/\./g, '')) || 0;
      state.value = formatNumber((qty * price).toString());
    },
    setUnitPrice: (state, action: PayloadAction<string>) => {
      state.unitPrice = action.payload;
      const qty = parseFloat(state.quantity.replace(/\./g, '')) || 0;
      const price = parseFloat(action.payload.replace(/\./g, '')) || 0;
      state.value = formatNumber((qty * price).toString());
    },
    setNotes: (state, action: PayloadAction<string>) => {
      state.notes = action.payload;
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
        notes: '',
      };
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

// Utility function
const formatNumber = (value: string): string => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

// Export actions
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
} = productSlice.actions;

// Export reducer
export default productSlice.reducer;