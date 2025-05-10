// src/store/store.ts
// 1 file store.ts để cấu hình toàn bộ Redux store và khai báo các RootState, AppDispatch.
import { configureStore } from '@reduxjs/toolkit';
import inventoryReducer from '../features/formReceiptSlip/formReceiptSlipSlice';
import productReducer from '../features/objectProductComponent/objectProductComponentSlice';
import myReducer from './slices/mySlice'; // Adjust path if needed

// Cấu hình store với tất cả các reducer
export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
    product: productReducer,
    myFeature: myReducer, // For mySlice
  },
});

// Tạo type RootState và AppDispatch cho Redux Toolkit
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
