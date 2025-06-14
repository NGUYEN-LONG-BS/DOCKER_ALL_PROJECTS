// src/features/formReceiptLog/formReceiptLogSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_import_data, API_inventory_stock } from '@/api/api';

// Define interfaces
interface Supplier {
  code: string;
  name: string;
  taxId: string;
  address: string;
}

interface SlipNote {
  selectedWarehouse: string;
  notesOfSlip: string;
}

interface Product {
  code: string;
  name: string;
  unit: string;
  quantity: number;
  price: number;
  notes: string;
}

interface InventoryItem {
  id: number;
  so_phieu: string;
  ngay_tren_phieu: string;
  so_phieu_de_nghi: string;
  ma_doi_tuong: string;
  ten_doi_tuong?: string;
  ma_hang: string;
  ten_hang?: string;
  ma_kho_nhan: string;
  so_luong: string;
}

interface FormState {
  date: string;
  documentNumber: string;
  documentRequestNumber: string;
  slipNote: SlipNote;
  supplier: Supplier;
  selectedProduct: Product;
  selectedFile: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  success: string | null;
  inventoryData: InventoryItem[];
}

// Initial state
const initialState: FormState = {
  date: new Date().toISOString().split('T')[0],
  documentNumber: 'TB-PNK-250001',
  documentRequestNumber: 'TB-DNNK-250001',
  slipNote: {
    selectedWarehouse: 'Kho A',
    notesOfSlip: '',
  },
  supplier: {
    code: '',
    name: '',
    taxId: '',
    address: '',
  },
  selectedProduct: {
    code: '',
    name: '',
    unit: '',
    quantity: 0,
    price: 0,
    notes: '',
  },
  selectedFile: null,
  status: 'idle',
  error: null,
  success: null,
  inventoryData: [],
};

// Async thunk for file import
export const importFile = createAsyncThunk(
  'form/importFile',
  async (file: File, { rejectWithValue }) => {
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
      return rejectWithValue(error.message || 'Error importing file');
    }
  }
);

// Async thunk for fetching inventory data
export const fetchInventoryData = createAsyncThunk(
  'form/fetchInventoryData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_inventory_stock);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error fetching inventory data');
    }
  }
);

// Create the slice
const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setDate: (state, action: { payload: string }) => {
      state.date = action.payload;
    },
    setDocumentNumber: (state, action: { payload: string }) => {
      state.documentNumber = action.payload;
    },
    setDocumentRequestNumber: (state, action: { payload: string }) => {
      state.documentRequestNumber = action.payload;
    },
    setSlipNote: (state, action: { payload: SlipNote }) => {
      state.slipNote = action.payload;
    },
    setSupplier: (state, action: { payload: Supplier }) => {
      state.supplier = action.payload;
    },
    setSelectedProduct: (state, action: { payload: Product }) => {
      state.selectedProduct = action.payload;
    },
    setSelectedFile: (state, action: { payload: string | null }) => {
      state.selectedFile = action.payload;
    },
    setError: (state, action: { payload: string | null }) => {
      state.error = action.payload;
    },
    setSuccess: (state, action: { payload: string | null }) => {
      state.success = action.payload;
    },
    clearForm: (state) => {
      state.date = new Date().toISOString().split('T')[0];
      state.documentNumber = 'TB-PNK-250001';
      state.documentRequestNumber = 'TB-DNNK-250001';
      state.slipNote = { selectedWarehouse: 'Kho A', notesOfSlip: '' };
      state.supplier = { code: '', name: '', taxId: '', address: '' };
      state.selectedProduct = { code: '', name: '', unit: '', quantity: 0, price: 0, notes: '' };
      state.selectedFile = null;
      state.error = null;
      state.success = null;
      state.inventoryData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(importFile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.success = null;
      })
      .addCase(importFile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.success = 'File imported successfully!';
        state.selectedFile = null;
      })
      .addCase(importFile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(fetchInventoryData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchInventoryData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.inventoryData = action.payload.map((item: any, index: number) => ({
          id: index + 1,
          so_phieu: item.so_phieu,
          ngay_tren_phieu: item.ngay_tren_phieu,
          so_phieu_de_nghi: item.so_phieu_de_nghi,
          ma_doi_tuong: item.ma_doi_tuong,
          ten_doi_tuong: item.ten_doi_tuong || 'N/A',
          ma_hang: item.ma_hang,
          ten_hang: item.ten_hang || 'N/A',
          ma_kho_nhan: item.ma_kho_nhan,
          so_luong: item.so_luong,
        }));
      })
      .addCase(fetchInventoryData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const {
  setDate,
  setDocumentNumber,
  setDocumentRequestNumber,
  setSlipNote,
  setSupplier,
  setSelectedProduct,
  setSelectedFile,
  setError,
  setSuccess,
  clearForm,
} = formSlice.actions;

// Export reducer
export default formSlice.reducer;