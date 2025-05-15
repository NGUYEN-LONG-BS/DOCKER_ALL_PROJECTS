// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import inventoryReducer from '../features/formReceiptSlip/formReceiptSlipSlice';
import productReducer from '../features/formReceiptSlip/objectProductComponentSlice';
import inventoryTableReducer from '../features/formReceiptSlip/inventoryTableSlice';
import dateReducer from '../features/formReceiptSlip/dateSlice';
import documentNumberReducer from '../features/formReceiptSlip/documentNumberSlice';
import documentRequestNumberReducer from '../features/formReceiptSlip/documentRequestNumberSlice';
import supplierReducer from '../features/formReceiptSlip/supplierSlice';
import slipNoteReducer from '../features/formReceiptSlip/slipNoteSlice';
import tabNavReducer from '../features/formReceiptSlip/tabNavSlice';

// Cấu hình store với tất cả các reducer
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
  },
});

// Tạo type RootState và AppDispatch cho Redux Toolkit
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hook cho dispatch với type an toàn
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Custom hook cho selector với type an toàn
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;