// src/features/objectProductComponent/objectProductComponentSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

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

interface ProductState {
  Product: InventoryItemExport | null;
  searchText: string;
  filteredProducts: InventoryItemExport[];
  showDropdown: boolean;
  loading: boolean;
  quantity: string;
  unitPrice: string;
  value: string;
  notes: string;
  highlightedIndex: number;
  mockProducts: InventoryItemExport[];
  inventoryItem: InventoryItemExport;
  items: InventoryItemExport[];
  errorMessage: string | null;
}

const initialState: ProductState = {
  Product: null,
  searchText: '',
  filteredProducts: [],
  showDropdown: false,
  loading: false,
  quantity: '',
  unitPrice: '',
  value: '',
  notes: '',
  highlightedIndex: -1,
  mockProducts: [
    { id: 1, code: 'SP001', name: 'Sản phẩm A', unit: 'Cái', quantity: 0, price: 0, value: 0, notes: '' },
    { id: 2, code: 'SP002', name: 'Sản phẩm B', unit: 'Hộp', quantity: 0, price: 0, value: 0, notes: '' },
  ],
  inventoryItem: { id: 0, code: '', name: '', unit: '', quantity: 0, price: 0, value: 0, notes: '' },
  items: [],
  errorMessage: null,
};

export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
  // Simulate API call
  return initialState.mockProducts;
});

export const filterProducts = createAsyncThunk(
  'product/filterProducts',
  async (text: string, { getState }) => {
    const state = getState() as { product: ProductState };
    const products = state.product.mockProducts;
    return products.filter(
      (p) =>
        p.code.toLowerCase().includes(text.toLowerCase()) ||
        p.name.toLowerCase().includes(text.toLowerCase())
    );
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    selectProduct(state, action: PayloadAction<InventoryItemExport>) {
      state.Product = action.payload;
      state.inventoryItem = { ...action.payload, quantity: 0, price: 0, value: 0, notes: '' };
      state.showDropdown = false;
      state.searchText = action.payload.code;
    },
    setSearchText(state, action: PayloadAction<string>) {
      state.searchText = action.payload;
      state.showDropdown = true;
    },
    setShowDropdown(state, action: PayloadAction<boolean>) {
      state.showDropdown = action.payload;
    },
    setHighlightedIndex(state, action: PayloadAction<number>) {
      state.highlightedIndex = action.payload;
    },
    setQuantity(state, action: PayloadAction<string>) {
      state.quantity = action.payload;
      const quantity = parseFloat(action.payload.replace(/\./g, '')) || 0;
      state.inventoryItem.quantity = quantity;
      state.value = (quantity * state.inventoryItem.price).toString();
    },
    setUnitPrice(state, action: PayloadAction<string>) {
      state.unitPrice = action.payload;
      const price = parseFloat(action.payload.replace(/\./g, '')) || 0;
      state.inventoryItem.price = price;
      state.value = (state.inventoryItem.quantity * price).toString();
    },
    setNotes(state, action: PayloadAction<string>) {
      state.notes = action.payload;
      state.inventoryItem.notes = action.payload;
    },
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
      action: PayloadAction<{ id: number; field: keyof InventoryItemExport; value: string | number }>
    ) {
      const { id, field, value } = action.payload;
      state.items = state.items.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
              value:
                field === 'quantity' || field === 'price'
                  ? (field === 'quantity' ? Number(value) : item.quantity) *
                    (field === 'price' ? Number(value) : item.price)
                  : item.value,
            }
          : item
      );
    },
    setErrorMessage(state, action: PayloadAction<string | null>) {
      state.errorMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.mockProducts = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.errorMessage = 'Failed to fetch products';
      })
      .addCase(filterProducts.fulfilled, (state, action) => {
        state.filteredProducts = action.payload;
      });
  },
});

export const {
  selectProduct,
  setSearchText,
  setShowDropdown,
  setHighlightedIndex,
  setQuantity,
  setUnitPrice,
  setNotes,
  addItem,
  deleteItem,
  clearItems,
  updateItem,
  setErrorMessage,
} = productSlice.actions;

export default productSlice.reducer;