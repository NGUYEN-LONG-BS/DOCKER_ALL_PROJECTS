import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InventoryItemExport {
  id: number;
  code: string;
  name: string;
  unit: string;
  quantity: number;
  price: number;
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
    notes: '',
  },
  errorMessage: null,
  successMessage: null,
  selectedFile: null,
};

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