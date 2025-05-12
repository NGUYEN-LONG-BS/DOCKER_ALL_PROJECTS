// src/features/formReceiptSlip/formReceiptSlipSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch, RootState } from '../../store/store';

interface InventoryItemExport {
  id: number;
  code: string;
  name: string;
  unit: string;
  quantity: number;
  price: number;
  value: number; // Thêm value
  notes: string;
}

interface SlipNote {
  selectedWarehouse: string;
  notesOfSlip: string;
}

interface Supplier {
  code: string;
  name: string;
  taxId: string;
  address: string;
}

interface InventoryState {
  date: string;
  documentNumber: string;
  documentRequestNumber: string;
  slipNote: SlipNote;
  supplier: Supplier;
  inventoryTable: InventoryItemExport[];
  selectedProduct: InventoryItemExport;
  errorMessage: string | null;
  successMessage: string | null;
  selectedFile: File | null;
  loading: boolean; // Added for async operations
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
export const saveInventory = createAsyncThunk<any, any[], ThunkConfig>(
  'inventory/saveInventory',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/api/save-inventory/', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
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
      const response = await axios.get('http://localhost:8000/api/download-import-template/', {
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
      const response = await axios.get('http://localhost:8000/api/download-print-template/', {
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
      const response = await axios.post('http://localhost:8000/api/import-data/', formData, {
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
    setDate(state, action: PayloadAction<string>) {
      state.date = action.payload;
    },
    setDocumentNumber(state, action: PayloadAction<string>) {
      state.documentNumber = action.payload;
    },
    setDocumentRequestNumber(state, action: PayloadAction<string>) {
      state.documentRequestNumber = action.payload;
    },
    setSlipNote(state, action: PayloadAction<SlipNote>) {
      state.slipNote = action.payload;
    },
    setSupplier(state, action: PayloadAction<Supplier>) {
      state.supplier = action.payload;
    },
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
          state.selectedFile = null; // Reset file after successful import
        })
        .addCase(importFile.rejected, (state, action) => {
          state.loading = false;
          state.errorMessage = action.payload as string;
        });
    },
});

export const {
  setDate,
  setDocumentNumber,
  setDocumentRequestNumber,
  setSlipNote,
  setSupplier,
  setInventoryTable,
  setSelectedProduct,
  setErrorMessage,
  setSuccessMessage,
  setSelectedFile,
} = inventorySlice.actions;

export default inventorySlice.reducer;