import { configureStore } from '@reduxjs/toolkit';
import inventoryReducer from './inventorySlice';
import myReducer from './slices/mySlice'; // Adjust path if needed

export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
    myFeature: myReducer, // For mySlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

