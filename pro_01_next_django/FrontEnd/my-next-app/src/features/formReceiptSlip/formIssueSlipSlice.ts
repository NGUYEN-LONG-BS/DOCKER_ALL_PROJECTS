// src/features/formReceiptSlip/formIssueSlipSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch, RootState } from '../../store/store';
import { getPermissionOnDB } from '@/utils/getPermissionOnDB';
import { API_import_data, API_download_print_template, API_download_import_template, API_save_inventory } from '@/api/api';

interface InventoryItemExport {
  id: number;
  code: string;
  name: string;
  unit: string;
  quantity: number;
  price: number;
  value: number;
  notes: string;
}

interface InventoryState {
  inventoryTable: InventoryItemExport[];
  selectedProduct: InventoryItemExport;
  errorMessage: string | null;
  successMessage: string | null;
  selectedFile: File | null;
  loading: boolean;
}

interface FinalDataReceiptSlipExport {
  id: number;
  code: string;
  name: string;
  unit: string;
  quantity: number;
  price: number;
  notes: string;
}

const initialState: InventoryState = {
  inventoryTable: [
    {
      id: 1,
      code: '',
      name: '',
      unit: '',
      quantity: 0,
      price: 0,
      value: 0,
      notes: '',
    },
  ],
  selectedProduct: {
    id: Date.now(),
    code: '',
    name: '',
    unit: '',
    quantity: 0,
    price: 0,
    value: 0,
    notes: '',
  },
  errorMessage: null,
  successMessage: null,
  selectedFile: null,
  loading: false,
};

// Define thunk config type
interface ThunkConfig {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
}

// Async thunk for saving inventory data
export const saveInventory = createAsyncThunk<any, { data: any[], userId: string }, ThunkConfig>(
  'inventory/saveInventory',
  async ({ data, userId }, { rejectWithValue }) => {
    try {
      // Lấy model_key động từ quyền user
      const dynamicModelKey = userId && userId !== 'unknown' ? await getPermissionOnDB(userId) : null;
      console.log('model_key:', dynamicModelKey);
      console.log('data:', data);
      if (!dynamicModelKey) {
        return rejectWithValue('Không xác định được model_key. Vui lòng thử lại hoặc F5.');
      }
      // Gắn model_key vào từng object nếu chưa có
      const dataWithModelKey = data.map((item: any) => ({
        ...item,
        model_key: item.model_key || dynamicModelKey,
      }));
      const response = await axios.post(
        `${API_save_inventory}?model_key=${dynamicModelKey}`,
        dataWithModelKey,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Gửi thông tin thất bại!');
    }
  }
);

// Async thunk for downloading import template
export const downloadImportTemplate = createAsyncThunk<Blob, void, ThunkConfig>(
  'inventory/downloadImportTemplate',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_download_import_template, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Error downloading template');
    }
  }
);

// Async thunk for downloading print template
export const downloadPrintTemplate = createAsyncThunk<Blob, void, ThunkConfig>(
  'inventory/downloadPrintTemplate',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_download_print_template, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Error downloading print template');
    }
  }
);

// Async thunk for importing file
export const importFile = createAsyncThunk<any, File, ThunkConfig>(
  'inventory/importFile',
  async (file, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post(API_import_data, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Error importing file');
    }
  }
);

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setInventoryTable(state, action: PayloadAction<InventoryItemExport[]>) {
      state.inventoryTable = action.payload;
    },
    setSelectedProduct(state, action: PayloadAction<InventoryItemExport>) {
      state.selectedProduct = action.payload;
    },
    setErrorMessage(state, action: PayloadAction<string | null>) {
      state.errorMessage = action.payload;
    },
    setSuccessMessage(state, action: PayloadAction<string | null>) {
      state.successMessage = action.payload;
    },
    setSelectedFile(state, action: PayloadAction<File | null>) {
      state.selectedFile = action.payload;
    },
  },
  extraReducers: (builder) => {
      // Save Inventory
      builder
        .addCase(saveInventory.pending, (state) => {
          state.loading = true;
          state.errorMessage = null;
          state.successMessage = null;
        })
        .addCase(saveInventory.fulfilled, (state) => {
          state.loading = false;
          state.successMessage = 'Lưu thành công!';
        })
        .addCase(saveInventory.rejected, (state, action) => {
          state.loading = false;
          state.errorMessage = action.payload as string;
        })
      // Download Import Template
        .addCase(downloadImportTemplate.fulfilled, (state, action) => {
          const fileURL = window.URL.createObjectURL(new Blob([action.payload]));
          const link = document.createElement('a');
          link.href = fileURL;
          link.setAttribute('download', 'Import_template.xlsx');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .addCase(downloadImportTemplate.rejected, (state, action) => {
          state.errorMessage = action.payload as string;
        })
      // Download Print Template
        .addCase(downloadPrintTemplate.fulfilled, (state, action) => {
          const fileURL = window.URL.createObjectURL(new Blob([action.payload]));
          const link = document.createElement('a');
          link.href = fileURL;
          link.setAttribute('download', 'Print_template.xlsx');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .addCase(downloadPrintTemplate.rejected, (state, action) => {
          state.errorMessage = action.payload as string;
        })
      // Import File
        .addCase(importFile.pending, (state) => {
          state.loading = true;
          state.errorMessage = null;
          state.successMessage = null;
        })
        .addCase(importFile.fulfilled, (state) => {
          state.loading = false;
          state.successMessage = 'File imported successfully!';
          state.selectedFile = null;
        })
        .addCase(importFile.rejected, (state, action) => {
          state.loading = false;
          state.errorMessage = action.payload as string;
        });
    },
});

export const {
  setInventoryTable,
  setSelectedProduct,
  setErrorMessage,
  setSuccessMessage,
  setSelectedFile,
} = inventorySlice.actions;

export default inventorySlice.reducer;