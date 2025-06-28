// src/features/objectProductComponent/objectProductComponentSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as Utils from '@/utils';
import { API_get_inventory_categories } from '@/api/api';
import { getPermissionOnDB } from '@/utils/getPermissionOnDB';

// ==== 1. Định nghĩa kiểu dữ liệu ====

// Dữ liệu sản phẩm cơ bản
export interface ProductData {
  code: string;
  name: string;
  unit: string;
}

// Dữ liệu sản phẩm trong phiếu xuất/nhập kho
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

// Trạng thái tổng cho slice
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
  'product/fetchProducts', // Tên định danh cho thunk, được dùng để theo dõi trạng thái (pending, fulfilled, rejected)
  
  // Hàm async thực hiện logic gọi API
  async (_, { rejectWithValue }) => {
    try {
      // Lấy userId từ localStorage
      const userId = typeof window !== 'undefined' ? localStorage.getItem('user_id') || '' : '';
      let url = API_get_inventory_categories;
      if (userId) {
        const modelKey = await getPermissionOnDB(userId);
        if (modelKey) {
          url = `${API_get_inventory_categories}?model_key=${modelKey}`;
        }
      }
      // Gửi request GET đến API để lấy danh sách mặt hàng
      const response = await fetch(url);
      
      // Kiểm tra nếu phản hồi không hợp lệ (status không nằm trong khoảng 200-299)
      if (!response.ok) {
        throw new Error('Failed to fetch data'); // Ném lỗi để nhảy vào catch
      }

      // Chuyển dữ liệu phản hồi từ JSON thành object JavaScript
      const data = await response.json();

      // // In ra console để kiểm tra dữ liệu nhận được từ API
      // console.log("Data fetched from API: ", data);

      // Chuyển đổi dữ liệu từ dạng gốc sang dạng phù hợp với frontend:
      // ma_hang → code, ten_hang → name, dvt → unit
      return data.map((item: { ma_hang: string; ten_hang: string; dvt: string }) => ({
        code: item.ma_hang,
        name: item.ten_hang,
        unit: item.dvt,
      }));

    } catch (error) {
      // Nếu có lỗi, trả về lỗi thông qua rejectWithValue để xử lý ở phần Redux slice
      return rejectWithValue((error as Error).message);
    }
  }
);

// ==== 4. Tạo slice Redux ====
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // Cập nhật text tìm kiếm
    setSearchText: (state, action: PayloadAction<string>) => {
      console.log("setSearchText", action.payload)
      state.searchText = action.payload;
    },
    // Cập nhật danh sách sản phẩm đã lọc
    setFilteredProducts: (state, action: PayloadAction<ProductData[]>) => {
      state.filteredProducts = action.payload;
    },
    // Bật/tắt dropdown chọn sản phẩm
    setShowDropdown: (state, action: PayloadAction<boolean>) => {
      state.showDropdown = action.payload;
    },
    // Bật/tắt loading khi gọi API hoặc xử lý lọc
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    // Chọn một sản phẩm
    setProduct: (state, action: PayloadAction<ProductData>) => {
      state.Product = action.payload;
    },
    // Cập nhật inventory item khi người dùng đã chọn đủ thông tin sản phẩm
    setInventoryItem: (state, action: PayloadAction<InventoryItemExport>) => {
      state.inventoryItem = action.payload;
    },
    // Cập nhật số lượng và tính lại thành tiền
    setQuantity: (state, action: PayloadAction<string>) => {
      state.quantity = action.payload;
      const qty = parseFloat(action.payload.replace(/,/g, "")) || 0;
      state.inventoryItem.quantity = qty;
      state.inventoryItem.value = qty * state.inventoryItem.price;
      state.value = Utils.formatNumber(state.inventoryItem.value.toString());
      
    },
    // Cập nhật đơn giá và tính lại thành tiền
    setUnitPrice: (state, action: PayloadAction<string>) => {
      state.unitPrice = action.payload;
      const price = parseFloat(action.payload.replace(/,/g, "")) || 0;
      state.inventoryItem.price = price;
      state.inventoryItem.value = state.inventoryItem.quantity * price;
      state.value = Utils.formatNumber(state.inventoryItem.value.toString());
      
    },
    // Ghi chú cho sản phẩm
    setNotes: (state, action: PayloadAction<string>) => {
      state.notes = action.payload;
      state.inventoryItem.notes = action.payload;
    },
    // Cập nhật index khi user dùng phím lên/xuống chọn trong dropdown
    setHighlightedIndex: (state, action: PayloadAction<number>) => {
      state.highlightedIndex = action.payload;
    },
    // Lọc danh sách sản phẩm theo từ khóa tìm kiếm
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
    // Khi người dùng chọn một sản phẩm từ dropdown
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
    // Reducer mới cho bảng
    addItem: (state, action: PayloadAction<InventoryItemExport>) => {
      const newItem = { ...action.payload, id: state.items.length + 1 };
      const existingIndex = state.items.findIndex((item) => item.code === newItem.code);
      if (existingIndex !== -1) {
        // Thay thế item trùng code
        state.items = [
          ...state.items.slice(0, existingIndex),
          newItem,
          ...state.items.slice(existingIndex + 1),
        ].map((item, index) => ({ ...item, id: index + 1 }));
      } else {
        // Thêm item mới
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
    resetProductState: (state) => {
      state.Product = initialState.Product;
      state.inventoryItem = initialState.inventoryItem;
      state.searchText = initialState.searchText;
      state.filteredProducts = initialState.filteredProducts;
      state.showDropdown = initialState.showDropdown;
      state.loading = initialState.loading;
      state.quantity = initialState.quantity;
      state.unitPrice = initialState.unitPrice;
      state.value = initialState.value;
      state.notes = initialState.notes;
      // state.mockProducts = initialState.mockProducts;
      state.highlightedIndex = initialState.highlightedIndex;
      state.items = initialState.items;
      state.errorMessage = initialState.errorMessage;
    },
  },
  
  // ==== 5. Xử lý kết quả trả về từ fetchProducts ====
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true; // Khi request đang thực hiện
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.mockProducts = action.payload;  // Lưu dữ liệu khi thành công
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;  // Xử lý lỗi
      });
  },
});

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
  resetProductState,
} = productSlice.actions;

// ==== 8. Export reducer để dùng trong store ====
export default productSlice.reducer;