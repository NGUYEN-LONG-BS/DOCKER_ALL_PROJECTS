// src/store/index.ts
// 1 file index.ts trong src/store/ chỉ để export lại store và các hooks.
export { store } from './store'; // Export store từ file store.ts
export { useAppDispatch, useAppSelector } from './hooks'; // Export custom hooks từ file hooks.ts
