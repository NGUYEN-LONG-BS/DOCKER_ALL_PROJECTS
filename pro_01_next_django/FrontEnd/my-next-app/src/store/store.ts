// src/store/store.ts
// 1 file store.ts để cấu hình toàn bộ Redux store và khai báo các RootState, AppDispatch.
import { configureStore } from '@reduxjs/toolkit';
import inventoryReducer from '../features/formReceiptSlip/formReceiptSlipSlice';
import productReducer from '../features/objectProductComponent/objectProductComponentSlice';
import dateReducer from '../features/formReceiptSlip/dateSlice';
import documentNumberReducer from '../features/formReceiptSlip/documentNumberSlice';
import documentRequestNumberReducer from '../features/formReceiptSlip/documentRequestNumberSlice';
import supplierReducer from '../features/formReceiptSlip/supplierSlice';
import slipNoteReducer from '../features/formReceiptSlip/slipNoteSlice';

// Cấu hình store với tất cả các reducer
export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
    product: productReducer,
    date: dateReducer,
    documentNumber: documentNumberReducer,
    documentRequestNumber: documentRequestNumberReducer,
    supplier: supplierReducer,
    slipNote: slipNoteReducer,
  },
});

// Tạo type RootState và AppDispatch cho Redux Toolkit
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
