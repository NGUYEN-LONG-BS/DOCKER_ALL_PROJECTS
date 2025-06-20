// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import inventoryReducer from '../features/formReceiptSlip/formReceiptSlipSlice';
import productReducer from '../features/formReceiptSlip/objectProductComponentSlice';
import inventoryTableReducer from '../features/formReceiptSlip/inventoryTableSlice';
import dateReducer from '../features/formReceiptSlip/dateSlice';
import documentNumberReducer from '../features/formReceiptSlip/documentNumberSlice';
import documentRequestNumberReducer from '../features/formReceiptSlip/documentRequestNumberSlice';
import supplierReducer from '../features/formReceiptSlip/supplierInputFormSlice';
import slipNoteReducer from '../features/formReceiptSlip/slipNoteSlice';
import tabNavReducer from '../features/formReceiptSlip/tabNavSlice';
// ReceiptLogTableSlice
import ReceiptLogTableReducer from '../features/formReceiptLog/ReceiptLogTableSlice';
import formReducer from '../features/formReceiptLog/formReceiptLogSlice';
import documentNumberFilterFormReducer from '../features/formReceiptLog/documentNumberFilterFormSlice';
import documentRequestNumberFilterFormReducer from '../features/formReceiptLog/documentRequestNumberFilterFormSlice';
import supplierFilterFormReducer from '../features/formReceiptLog/supplierFilterFormSlice';
import productFilterFormReducer from '../features/formReceiptLog/objectProductFilterFormSlice';
import dateFilterFormReducer from '../features/formReceiptLog/dateFilterFormSlice';
import userReducer from '../features/userSlice';

// Configure the Redux store with all reducers
export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
    product: productReducer,
    inventoryTable: inventoryTableReducer,
    date: dateReducer,
    documentNumber: documentNumberReducer,
    documentRequestNumber: documentRequestNumberReducer,
    supplier: supplierReducer,
    slipNote: slipNoteReducer,
    tabNav: tabNavReducer,
    
    // ReceiptLogTableSlice
    ReceiptLogTable: ReceiptLogTableReducer,
    form: formReducer,
    documentNumberFilterForm: documentNumberFilterFormReducer,
    documentRequestNumberFilterForm: documentRequestNumberFilterFormReducer,
    supplierFilterForm: supplierFilterFormReducer,
    productFilterForm: productFilterFormReducer,
    dateFilterForm: dateFilterFormReducer,
    user: userReducer,
  },
});

// Define RootState and AppDispatch types for type safety
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hook for typed dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Custom hook for typed selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;