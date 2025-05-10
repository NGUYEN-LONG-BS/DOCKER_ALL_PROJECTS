import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// ==== 1. Định nghĩa kiểu dữ liệu ====

// Dữ liệu sản phẩm cơ bản
interface ProductData {
  code: string;
  name: string;
  unit: string;
}

// Dữ liệu sản phẩm trong phiếu xuất/nhập kho
interface InventoryItemExport {
  id: number;
  code: string;
  name: string;
  unit: string;
  quantity: number;
  price: number;
  notes: string;
}

// Trạng thái tổng cho slice
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
  mockProducts: ProductData[]; // Dữ liệu giả để lọc
  highlightedIndex: number; // Dùng cho navigation bằng phím
}

// ==== 2. Khởi tạo state ban đầu ====
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

// ==== 3. AsyncThunk gọi API lấy danh sách sản phẩm ====
export const fetchProducts = createAsyncThunk(
  'product/fetchProducts', // Tên định danh cho thunk, được dùng để theo dõi trạng thái (pending, fulfilled, rejected)
  
  // Hàm async thực hiện logic gọi API
  async (_, { rejectWithValue }) => {
    try {
      // Gửi request GET đến API để lấy danh sách mặt hàng
      const response = await fetch('http://localhost:8000/api/get-inventory-categories/');
      
      // Kiểm tra nếu phản hồi không hợp lệ (status không nằm trong khoảng 200-299)
      if (!response.ok) {
        throw new Error('Failed to fetch data'); // Ném lỗi để nhảy vào catch
      }

      // Chuyển dữ liệu phản hồi từ JSON thành object JavaScript
      const data = await response.json();

      // In ra console để kiểm tra dữ liệu nhận được từ API
      console.log("Data fetched from API: ", data);

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
      const qty = parseFloat(action.payload.replace(/\./g, '')) || 0;
      const price = parseFloat(state.unitPrice.replace(/\./g, '')) || 0;
      state.value = formatNumber((qty * price).toString());
    },
    // Cập nhật đơn giá và tính lại thành tiền
    setUnitPrice: (state, action: PayloadAction<string>) => {
      state.unitPrice = action.payload;
      const qty = parseFloat(state.quantity.replace(/\./g, '')) || 0;
      const price = parseFloat(action.payload.replace(/\./g, '')) || 0;
      state.value = formatNumber((qty * price).toString());
    },
    // Ghi chú cho sản phẩm
    setNotes: (state, action: PayloadAction<string>) => {
      state.notes = action.payload;
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
        notes: '',
      };
    },
  },
  // ==== 5. Xử lý kết quả trả về từ fetchProducts ====
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
} = productSlice.actions;

// ==== 8. Export reducer để dùng trong store ====
export default productSlice.reducer;