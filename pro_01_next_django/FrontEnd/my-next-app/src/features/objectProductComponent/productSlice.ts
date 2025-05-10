import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductData {
  code: string;
  name: string;
  unit: string;
}

interface InventoryItemExport extends ProductData {
  id: number;
  quantity: number;
  price: number;
  notes: string;
}

interface ProductState {
  searchText: string;
  filteredProducts: ProductData[];
  showDropdown: boolean;
  loading: boolean;
  product: ProductData;
  inventoryItem: InventoryItemExport;
}

const initialState: ProductState = {
  searchText: '',
  filteredProducts: [],
  showDropdown: false,
  loading: false,
  product: { code: '', name: '', unit: '' },
  inventoryItem: {
    id: 0,
    code: '',
    name: '',
    unit: '',
    quantity: 0,
    price: 0,
    notes: '',
  },
};

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
      state.product = action.payload;
    },
    setInventoryItem: (state, action: PayloadAction<InventoryItemExport>) => {
      state.inventoryItem = action.payload;
    },
    updateInventoryItem: (state, action: PayloadAction<Partial<InventoryItemExport>>) => {
      state.inventoryItem = { ...state.inventoryItem, ...action.payload };
    },
  },
});

export const {
  setSearchText,
  setFilteredProducts,
  setShowDropdown,
  setLoading,
  setProduct,
  setInventoryItem,
  updateInventoryItem,
} = productSlice.actions;

export default productSlice.reducer;
